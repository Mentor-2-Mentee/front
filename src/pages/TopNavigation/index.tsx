import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FontSize } from "../../commonStyles/CommonFont";
import UserMenuIcons from "./UserMenuIcons";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import React, { useContext, useEffect, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import SignIn from "./SignIn";
import { RootContext } from "../../hooks/context/RootContext";

import useMediaQuery from "@mui/material/useMediaQuery";

import MenuIcon from "@mui/icons-material/Menu";

const getSelectedMenuNameFromHref = (fullUrl: string): string => {
  const parentPath = fullUrl.toString().split("/")[3]; // ['http','','{BaseUrl}','{targetParentPath}']
  return "/" + parentPath;
};

const TOP_NAVIGATION_MENU_LIST: MenuElement[] = [
  // {
  //   href: "/qrooms",
  //   menuText: "실시간 질의응답방",
  // },
  {
    href: "/question/list",
    menuText: "질문 게시판",
  },
  {
    href: "/exam-schedule",
    menuText: "시험일정",
  },
  // {
  //   href: "/question-db",
  //   menuText: "문제 저장소",
  // },
];

interface MenuElement {
  href: string;
  menuText: string;
}

export const TopNavigation = (): JSX.Element => {
  const { userName } = useContext(RootContext);
  const [selectedMenu, setSelectedMenu] = useState<string>(
    getSelectedMenuNameFromHref(window.location.toString())
  );
  const navigation = useNavigate();

  const location = useLocation();
  if (location.pathname.split("/")[1] === "pdf") {
    return <>{null}</>;
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setSelectedMenu(getSelectedMenuNameFromHref(event.currentTarget.href));
  };

  const isWidthShort = useMediaQuery("(max-width:900px)");

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {TOP_NAVIGATION_MENU_LIST.map((menu) => (
          <ListItem key={menu.href} disablePadding>
            <ListItemButton
              onClick={() => {
                navigation(menu.href);
              }}
            >
              <ListItemText primary={menu.menuText} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <TopNavigationContainer
      sx={(theme) => ({
        p: isWidthShort ? theme.spacing(0, 1, 0, 1) : theme.spacing(0, 8, 0, 8),
      })}
    >
      {isWidthShort ? (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ pl: 2 }}
          >
            <MenuIcon />
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              {list()}
            </Drawer>
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flex: 1,
            }}
          >
            <Link to="/main" onClick={handleMenuClick}>
              M2M
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            component="div"
            sx={(theme) => ({
              paddingRight: theme.spacing(1.5),
              marginRight: theme.spacing(1.5),
              borderRight: "2px solid black",
            })}
          >
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
                  className={
                    selectedMenu === menu.href ? "selected" : "unSelected"
                  }
                  onClick={handleMenuClick}
                >
                  {menu.menuText}
                </Link>
              );
            })}
          </MenuList>
        </>
      )}

      {userName === undefined ? (
        <SignIn />
      ) : (
        <NickName
          sx={{
            color: SignatureColor.RED,
          }}
        >
          {userName}
        </NickName>
      )}

      <UserMenuIcons />

      {/* <RootContext.Consumer>
        {({ id, userName }) => {
          if (id === undefined || userName === undefined) {
            return <SignIn />;
          }
          return (
            <>
              <NickName
                sx={{
                  color: SignatureColor.RED,
                }}
              >
                {userName}
              </NickName>
              <UserMenuIcons />
            </>
          );
        }}
      </RootContext.Consumer> */}
    </TopNavigationContainer>
  );
};

const TopNavigationContainer = styled("div")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 99,
  height: theme.spacing(6),
  borderBottom: "1px solid black",
  backgroundColor: "#ffffff",

  display: "flex",
  alignItems: "center",
  textDecoration: "none",

  "& a": {
    margin: theme.spacing(0, 1.5, 0, 1.5),
    textDecoration: "none",
    color: "black",
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
