import { styled } from "@mui/system";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Popover } from "@mui/material";
import { useContext, useState } from "react";
import { deleteCookieValues } from "../../utils/handleCookieValue";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../../hooks/context/RootContext";
import { UserProfile } from "../../api/getUserProfile";

export const UserMenuIcons = (): JSX.Element => {
  const [anchorElement, setAnchorElement] =
    useState<SVGSVGElement | null>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const navigation = useNavigate();
  const { setRootContext } = useContext(RootContext);

  const handleAccountMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setIsAccountMenuOpen(true);
    setAnchorElement(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false);
  };

  const handleSignOutButton = () => {
    deleteCookieValues({ deleteCookieKeys: ["refreshToken", "accessToken"] });
    setRootContext({
      userId: undefined,
      username: undefined,
      userGrade: undefined,
    });
    setIsAccountMenuOpen(false);
    navigation("/main");
  };

  const handleUserProfileButton = () => {
    setIsAccountMenuOpen(false);
    navigation("/user_profile");
  };

  return (
    <MenuContainer>
      <AccountCircleOutlinedIcon onClick={handleAccountMenuOpen} />
      <Popover
        open={isAccountMenuOpen}
        anchorEl={anchorElement}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& > *": {
            marginTop: 1,
            // border: "1px solid black",
          },
        }}
      >
        <SignOutElement onClick={handleSignOutButton}>로그아웃</SignOutElement>
        <UserProfileElement onClick={handleUserProfileButton}>
          계정정보수정
        </UserProfileElement>
        <div>짜잔</div>
        <div>짜잔</div>
      </Popover>
      <NotificationsNoneOutlinedIcon />
      <EmojiEventsIcon />
    </MenuContainer>
  );
};

const MenuContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(0, 2, 0, 2),
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const SignOutElement = styled("div")(({ theme }) => ({
  textDecoration: "none",
}));

const UserProfileElement = styled("div")(({ theme }) => ({
  textDecoration: "none",
}));

export default UserMenuIcons;
