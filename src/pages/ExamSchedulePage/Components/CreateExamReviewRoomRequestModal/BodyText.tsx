import { Typography } from "@mui/material";

export const BodyText = (): JSX.Element => {
  return (
    <>
      <Typography variant="subtitle2">
        응시할 직군을 선택해서 신청해주세요
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        목록에 없다면 직접 입력선택후 작성해주세요.
      </Typography>
      <Typography variant="subtitle2" sx={{ mb: 2 }}>
        시험리뷰방은 관리자 승인 후 생성됩니다.
      </Typography>
    </>
  );
};

export default BodyText;
