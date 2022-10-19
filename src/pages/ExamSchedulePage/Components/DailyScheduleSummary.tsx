import { Box, Button, SxProps, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ExamScheduleContext } from "..";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import CircleIcon from "@mui/icons-material/Circle";
import { useSearchParams } from "react-router-dom";

export const DailyScheduleSummary = () => {
  const { selectedDayScheduleList } = useContext(ExamScheduleContext);
  const navigation = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location_YYYY = Number(searchParams.get("year"));
  const location_MM = Number(searchParams.get("month"));

  const handleScheduleButton = (examScheduleId: number) => () => {
    navigation(
      `/exam-schedule?year=${location_YYYY}&month=${location_MM}#${examScheduleId}`
    );
  };

  if (selectedDayScheduleList.length === 0) {
    return (
      <Box sx={SelectedScheduleBoxSxProps}>
        <EmptySchedule />
      </Box>
    );
  }

  return (
    <Box sx={SelectedScheduleBoxSxProps}>
      {selectedDayScheduleList.map((examSchedule) => {
        return (
          <Box sx={ListBoxSxProps}>
            <Box sx={ListElementBoxSxProps}>
              <CircleIcon sx={CircleIconSxProps(examSchedule.scheduleType)} />
              <Typography variant="h6" sx={OrganizerSxProps}>
                {examSchedule.organizer}
              </Typography>
            </Box>
            <Button onClick={handleScheduleButton(examSchedule.id)}>
              공고확인
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

const EmptySchedule = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <Typography variant="h5" sx={EmptyTextSxProps}>
        일정 없음
      </Typography>
    </Box>
  );
};

const ListBoxSxProps: SxProps = {
  ml: 4,
  mr: 4,
  pb: 0.5,
  pt: 1,
  display: "flex",
  borderBottom: `1px solid ${SignatureColor.GRAY_BORDER}`,
  justifyContent: "space-between",
};

const ListElementBoxSxProps: SxProps = {
  display: "flex",
  alignItems: "center",
};

const EmptyTextSxProps: SxProps = {
  fontWeight: "bold",
  color: SignatureColor.BLACK_50,
};

const OrganizerSxProps: SxProps = {
  fontWeight: "bold",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
  maxWidth: 200,
};

const SelectedScheduleBoxSxProps: SxProps = {
  mt: 1,
  borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
};

const CircleIconColor = (examType: string): SignatureColor => {
  switch (examType) {
    case "채용":
      return SignatureColor.RED;

    case "자격증":
      return SignatureColor.BLUE;

    default:
      return SignatureColor.BLACK_50;
  }
};

const CircleIconSxProps = (examType?: string): SxProps => ({
  fontSize: 10,
  mt: 1,
  mb: 1,
  mr: 1,
  color: examType ? CircleIconColor(examType) : SignatureColor.BLACK_50,
});
