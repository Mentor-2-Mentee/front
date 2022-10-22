import {
  Box,
  Button,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";

//해당 방 전체 문제수 GET, PUT(bulkCreate), DELETE(bulkDelete) 쿼리 필요

export const Option = () => {
  const examQuestionQuery = 10;

  return (
    <Box sx={OptionBoxSxProps}>
      <Typography variant="h5">문제 세부 설정</Typography>
      <Typography variant="subtitle1">{`현재 총 문제수 : ${examQuestionQuery}`}</Typography>
      <TextField
        size="small"
        // value={questionCount}
        // onChange={handleQuestionCount}
      />
      <Button
      //   onClick={submitNewQuestionCount}
      >
        전체 문제수 수정하기
      </Button>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        현재 문제수 이하로 조정시 맨 뒤의 문제부터 삭제됩니다.
      </Typography>
      <Typography
        sx={{ fontWeight: "bold", color: SignatureColor.RED }}
        variant="subtitle2"
      >
        삭제된 문제는 복구할 수 없습니다. 주의해주세요.
      </Typography>
    </Box>
  );
};

const OptionBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  p: 2,
  overflow: "scroll",
  height: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(19)} )`,
});

export default Option;
