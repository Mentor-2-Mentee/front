import { Typography } from "@mui/material";

export const Header = (): JSX.Element => {
  return (
    <Typography variant="subtitle1" sx={{ fontWeight: "bolder", mb: 2 }}>
      시험리뷰방 생성신청
    </Typography>
  );
};

export default Header;
