import { styled } from "@mui/system";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Popover, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { deleteCookieValues } from "../../utils/handleCookieValue";
import { useNavigate } from "react-router-dom";
import { RootContext } from "../../hooks/context/RootContext";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { userGradeCheck } from "../../utils/userGradeCheck";

export const UserMenuIcons = (): JSX.Element => {
  const { id } = useContext(RootContext);
  const [anchorElement, setAnchorElement] = useState<SVGSVGElement | null>(
    null
  );
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const navigation = useNavigate();
  const { userGrade, setRootContextState } = useContext(RootContext);

  const handleAccountMenuOpen = (event: React.MouseEvent<SVGSVGElement>) => {
    setIsAccountMenuOpen(true);
    setAnchorElement(event.currentTarget);
  };
  const handleAccountMenuClose = () => {
    setIsAccountMenuOpen(false);
  };

  const handleSignOutButton = () => {
    deleteCookieValues({ deleteCookieKeys: ["refreshToken", "accessToken"] });
    setRootContextState((currentState) => ({
      ...currentState,
      id: undefined,
      userName: undefined,
      userGrade: undefined,
    }));
    setIsAccountMenuOpen(false);
    navigation("/main");
  };

  const handleUserProfileButton = () => {
    setIsAccountMenuOpen(false);
    navigation("/user_profile");
  };

  const handleAdministratorButton = () => {
    setIsAccountMenuOpen(false);
    navigation("/admin");
  };

  const handleInqueryButton = () => {
    setIsAccountMenuOpen(false);
    navigation("/inquery/list");
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
      >
        <PopoverContainer>
          {id === undefined ? null : (
            <>
              <SignOutElement onClick={handleSignOutButton}>
                로그아웃
              </SignOutElement>
              <UserProfileElement onClick={handleUserProfileButton}>
                계정정보수정
              </UserProfileElement>
              <hr />
            </>
          )}

          <Typography sx={{ pl: 1, pb: 1 }} onClick={handleInqueryButton}>
            문의하기
          </Typography>
          {userGradeCheck(["master", "admin"], userGrade) ? (
            <div onClick={handleAdministratorButton}>관리자페이지</div>
          ) : null}
        </PopoverContainer>
      </Popover>
      {id === undefined ? null : <NotificationsNoneOutlinedIcon />}
      <EmojiEventsIcon />
    </MenuContainer>
  );
};

const MenuContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: theme.spacing(0, 2, 0, 2),
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const PopoverContainer = styled("div")(({ theme }) => ({
  width: theme.spacing(20),
  padding: theme.spacing(1, 0, 0, 0),

  "& > div": {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(0.5, 1, 0.5, 1),

    "&:hover": {
      background: SignatureColor.GRAY,
    },
  },
}));

const SignOutElement = styled("div")({
  textDecoration: "none",
});

const UserProfileElement = styled("div")({
  textDecoration: "none",
});

export default UserMenuIcons;
