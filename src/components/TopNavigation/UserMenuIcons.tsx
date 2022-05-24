import { styled } from "@mui/system";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

export const UserMenuIcons = () => {
  return (
    <MenuContainer>
      <AccountCircleOutlinedIcon />
      <NotificationsNoneOutlinedIcon />
      <MessageOutlinedIcon />
    </MenuContainer>
  );
};

const MenuContainer = styled("div")({
  marginLeft: 10,
  marginRight: 10,
  "& > *": {
    margin: 8,
  },
});

export default UserMenuIcons;
