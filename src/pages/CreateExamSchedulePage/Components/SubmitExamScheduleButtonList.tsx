import { Box, Button } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useNavigate } from "react-router-dom";
import { useUpdateExamScheduleMutation } from "../../../hooks/queries/examSchedule/useUpdateExamScheduleMutation";

interface SubmitExamScheduleButtonListProps {
  isUpdate: boolean;
  submitExamScheduleCallback: () => void;
}

export const SubmitExamScheduleButtonList = ({
  isUpdate,
  submitExamScheduleCallback,
}: SubmitExamScheduleButtonListProps): JSX.Element => {
  const navigation = useNavigate();
  const handleCancelButton = () => navigation(-1);

  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "row",
        justifyContent: "end",
        mt: 2,

        "& > button": {
          ml: 2,
        },
      }}
    >
      <Button
        variant="contained"
        sx={{
          background: SignatureColor.GRAY,
          color: SignatureColor.BLACK,
          "&:hover": {
            background: SignatureColor.RED,
            color: SignatureColor.WHITE,
          },
        }}
        onClick={handleCancelButton}
      >
        취소
      </Button>
      <Button variant="contained" onClick={submitExamScheduleCallback}>
        {isUpdate ? "수정하기" : "등록하기"}
      </Button>
    </Box>
  );
};

export default SubmitExamScheduleButtonList;
