import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { FontSize } from "../../commonStyles/font";
import UserMenuIcons from "./UserMenuIcons";

const USERDATA_DEV = {
  nickName: "시험보는 호두",
  userColor: "rgb(234,123,22)",
};

export const TopNavigation = () => {
  return (
    <TopNavigationContainer>
      <Typography variant="h4" component="a" className="stonetext">
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

const TopNavigationContainer = styled("div")({
  position: "sticky",
  top: 0,
  width: "100%",
  height: 50,
  borderBottom: "1px solid black",

  display: "flex",
  alignItems: "center",
  textDecoration: "none",

  "& a": {
    marginLeft: 10,
    marginRight: 10,
    textDecoration: "none",
    color: "black",
  },

  "& .stonetext": {
    paddingRight: 10,
    borderRight: "2px solid black",
  },
});

const MenuList = styled("div")({
  flex: 1,
});

const NickName = styled("div")({
  fontWeight: "bold",
  fontSize: FontSize.TOP_NAVIGATION_NICKNAME,
  margin: 10,
});
