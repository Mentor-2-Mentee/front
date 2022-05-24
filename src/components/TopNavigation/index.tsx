import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { FontSize } from "../../commonStyles/font";
import UserMenuIcons from "./UserMenuIcons";

const USERDATA_DEV = {
  nickName: "시험보는 호두",
  userColor: "rgb(234,123,22)",
};

export const TopNavigation = (): JSX.Element => {
  return (
    <TopNavigationContainer>
      <Typography variant="h4" component="div" className="stonetext">
        <Link to="/main">M2M</Link>
      </Typography>
      <MenuList>
        <Link to="/qrooms">질의응답방</Link>
        <Link to="/waitqs">답변대기 문제</Link>
        <Link to="/solved">해결된 문제들</Link>
        <Link to="/test-schedule">시험일정</Link>
      </MenuList>
      <NickName
        sx={{
          color: USERDATA_DEV.userColor,
        }}
      >
        {USERDATA_DEV.nickName}
      </NickName>
      <UserMenuIcons />
    </TopNavigationContainer>
  );
};

const TopNavigationContainer = styled("div")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
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

  "& .stonetext": {
    paddingRight: theme.spacing(1.5),
    borderRight: "2px solid black",
  },
}));

const MenuList = styled("div")({
  flex: 1,
});

const NickName = styled("div")(({ theme }) => ({
  fontWeight: "bold",
  fontSize: FontSize.TOP_NAVIGATION_NICKNAME,
  margin: theme.spacing(0, 1, 0, 1),
}));
