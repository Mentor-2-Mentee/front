import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ExamScheduleContext } from "..";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import CircleIcon from "@mui/icons-material/Circle";

export const DailyScheduleSummary = () => {
  const { selectedDayScheduleList } = useContext(ExamScheduleContext);
  const navigation = useNavigate();
  return (
    <Box sx={SelectedScheduleBoxSxProps}>
      {selectedDayScheduleList.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: SignatureColor.BLACK_50,
            }}
          >
            일정 없음
          </Typography>
        </Box>
      ) : (
        <>
          {selectedDayScheduleList.map((ele) => {
            return (
              <Box
                sx={{
                  ml: 4,
                  mr: 4,
                  pb: 0.5,
                  pt: 1,
                  display: "flex",
                  borderBottom: `1px solid ${SignatureColor.GRAY_BORDER}`,
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CircleIcon sx={CircleIconSxProps(ele.examField)} />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      maxWidth: 200,
                    }}
                  >
                    {ele.examScheduleTitle}
                  </Typography>
                </Box>
                <Button
                  onClick={() => {
                    navigation(`/exam-schedule#${ele.examScheduleId}`);
                  }}
                >
                  공고확인
                </Button>
              </Box>
            );
          })}
        </>
      )}
    </Box>
  );
};

const SelectedScheduleBoxSxProps: SxProps<Theme> = (theme: Theme) => ({
  mt: 1,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
});

const CircleIconColor = (examField: string): SignatureColor => {
  switch (examField) {
    case "채용":
      return SignatureColor.RED;

    case "자격증":
      return SignatureColor.BLUE;

    default:
      return SignatureColor.BLACK_50;
  }
};

const CircleIconSxProps = (examField?: string): SxProps => ({
  fontSize: 10,
  mt: 1,
  mb: 1,
  mr: 1,
  color: examField ? CircleIconColor(examField) : SignatureColor.BLACK_50,
});
