import { Box, Button, SxProps, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ExamScheduleContext } from "..";
import { SignatureColor } from "../../../commonStyles/CommonColor";

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
  borderTop: `1px solid ${SignatureColor.BLACK_50}`,
});
