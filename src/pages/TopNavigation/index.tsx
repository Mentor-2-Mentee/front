import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { FontSize } from "../../commonStyles/CommonFont";
import UserMenuIcons from "./UserMenuIcons";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import React, { useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import SignIn from "./SignIn";
import { RootContext } from "../../hooks/context/RootContext";

const getSelectedMenuNameFromHref = (fullUrl: string): string => {
  const parentPath = fullUrl.toString().split("/")[3]; // ['http','','{BaseUrl}','{targetParentPath}']
  return "/" + parentPath;
};

const TOP_NAVIGATION_MENU_LIST: MenuElement[] = [
  {
    href: "/qrooms",
    menuText: "질의응답방",
  },
  {
    href: "/waitqs",
    menuText: "답변대기 문제",
  },
  {
    href: "/solved",
    menuText: "해결된 문제들",
  },
  {
    href: "/test-schedule",
    menuText: "시험일정",
  },
];

interface MenuElement {
  href: string;
  menuText: string;
}

export const TopNavigation = (): JSX.Element => {
  const [selectedMenu, setSelectedMenu] = useState<string>(
    getSelectedMenuNameFromHref(window.location.toString())
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setSelectedMenu(getSelectedMenuNameFromHref(event.currentTarget.href));
  };

  return (
    <TopNavigationContainer>
      <Typography variant="h4" component="div" className="stonetext">
        <Link to="/main" onClick={handleMenuClick}>
          M2M
        </Link>
      </Typography>
      <MenuList>
        {TOP_NAVIGATION_MENU_LIST.map((menu) => {
          return (
            <Link
              key={menu.href}
              to={menu.href}
              className={selectedMenu === menu.href ? "selected" : "unSelected"}
              onClick={handleMenuClick}
            >
              {menu.menuText}
            </Link>
          );
        })}
      </MenuList>

      <RootContext.Consumer>
        {({ userId, username }) => {
          if (userId === undefined || username === undefined) {
            return <SignIn />;
          }
          return (
            <>
              <NickName
                sx={{
                  color: SignatureColor.RED,
                }}
              >
                {username}
              </NickName>
              <UserMenuIcons />
            </>
          );
        }}
      </RootContext.Consumer>
    </TopNavigationContainer>
  );
};

const TopNavigationContainer = styled("div")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  height: theme.spacing(6),
  borderBottom: "1px solid black",
  backgroundColor: "#ffffff",

  padding: theme.spacing(0, CommonSpace.MARGIN, 0, CommonSpace.MARGIN),

  display: "flex",
  alignItems: "center",
  textDecoration: "none",

  "& a": {
    margin: theme.spacing(0, 1.5, 0, 1.5),
    textDecoration: "none",
    color: "black",
  },

  "& .stonetext": {
    paddingRight: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    borderRight: "2px solid black",
  },
}));

const MenuList = styled("div")({
  flex: 1,

  "& > a": {
    color: SignatureColor.BLACK_50,

    "&:hover": {
      fontWeight: "bold",
    },
  },

  "& .selected": {
    color: SignatureColor.BLACK,
    fontWeight: "bold",
  },
});

const NickName = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  fontSize: FontSize.TOP_NAVIGATION_NICKNAME,
  margin: theme.spacing(0, 1, 0, 1),
}));

export default TopNavigation;
