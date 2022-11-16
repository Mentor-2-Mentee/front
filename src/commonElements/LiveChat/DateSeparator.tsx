import { Box, Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";
import DateFormatting from "../../utils/dateFormatting";

interface DateSeparatorProps {
  timeStamp: string;
}

export const DateSeparator = ({ timeStamp }: DateSeparatorProps) => {
  const YYYY_MM_DD = new DateFormatting(new Date(timeStamp)).YYYY_MM_DD;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: 5,
        alignItems: "center",
        color: SignatureColor.BLACK_50,
        backgroundColor: SignatureColor.GRAY_BORDER,
        mt: 1,
        mb: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          backgroundColor: SignatureColor.WHITE,
          pl: 2,
          pr: 2,
        }}
      >
        {YYYY_MM_DD}
      </Typography>
    </Box>
  );
};

export default DateSeparator;
