import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { SignatureColor } from "../../commonStyles/CommonColor";
import TagManagement from "./TagManagement";

export const AdminPage = (): JSX.Element => {
  return (
    <BackgroundBox>
      <AdminPageContainer>
        <Typography variant="h5">관리자페이지</Typography>
        <TagManagement />
      </AdminPageContainer>
    </BackgroundBox>
  );
};

const BackgroundBox = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  padding: theme.spacing(15, 15, 60, 15),
}));

const AdminPageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(10, 15, 10, 15),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),

  "& > *": {
    marginBottom: theme.spacing(3),
  },
}));

export default AdminPage;
