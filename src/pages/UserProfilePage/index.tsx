import { styled } from "@mui/system";
import { useContext } from "react";
import { RootContext } from "../../context/RootContext";

export const UserProfilePage = (): JSX.Element => {
  const { userId, userName } = useContext(RootContext);
  return (
    <UserProfilePageContainer>
      <div>여기는 유저 개인정보 수정페이지</div>
      <input type="text" value={userName} />
    </UserProfilePageContainer>
  );
};
const UserProfilePageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 30, 10, 30),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

export default UserProfilePage;
