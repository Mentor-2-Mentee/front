import { styled } from "@mui/system";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

export const UserMenuIcons = (): JSX.Element => {
  return (
    <MenuContainer>
      <AccountCircleOutlinedIcon />
      <NotificationsNoneOutlinedIcon />
      <MessageOutlinedIcon />
    </MenuContainer>
  );
};

const MenuContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 2, 0, 2),
  "& > *": {
    margin: theme.spacing(1),
  },
}));

export default UserMenuIcons;
