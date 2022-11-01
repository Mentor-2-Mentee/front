import { Box, useMediaQuery } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { AdminPageHeader, TagManagement } from "./Components";

export const AdminPage = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  return (
    <Box
      sx={(theme) => ({
        background: SignatureColor.GRAY,
        padding: isWidthShort
          ? theme.spacing(2, 2, 2, 2)
          : theme.spacing(4, 4, 4, 4),
        minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
      })}
    >
      <Box
        sx={(theme) => ({
          padding: isWidthShort
            ? theme.spacing(3, 3, 3, 3)
            : theme.spacing(6, 6, 6, 6),
          background: SignatureColor.WHITE,
          borderRadius: theme.spacing(3),
          minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,

          "& > *": {
            marginBottom: theme.spacing(3),
          },
        })}
      >
        <AdminPageHeader />
        <TagManagement />
      </Box>
    </Box>
  );
};

export default AdminPage;
