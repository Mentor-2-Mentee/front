import {
  Box,
  Button,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetExamScheduleListQuery } from "../../../hooks/queries/examSchedule";
import DateFormatting from "../../../utils/dateFormatting";

export const ScheduleSummary = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const navigation = useNavigate();
  const rawToday = new Date();
  const today = new DateFormatting(rawToday);
  const examScheduleListQuery = useGetExamScheduleListQuery({
    startDate: today.YYYY_MM_DD,
    endDate: new DateFormatting(
      new Date(
        rawToday.getFullYear(),
        rawToday.getMonth(),
        rawToday.getDate() + 7
      )
    ).YYYY_MM_DD,
  });

  if (examScheduleListQuery.status === "loading") return <div>Loading...</div>;
  if (examScheduleListQuery.status === "error") return <div>Error</div>;

  return (
    <Box sx={ScheduelSummaryBoxSxProps(isWidthShort)}>
      <Box
        sx={{
          gridArea: "today",
          backgroundColor: SignatureColor.WHITE,
          borderTopLeftRadius: 10,
          borderTopRightRadius: isWidthShort ? 10 : 0,
          borderBottomLeftRadius: isWidthShort ? 10 : 0,
          pl: 2,
          pt: 1,
          borderRight: `5px solid ${SignatureColor.GRAY}`,
        }}
      >
        <Typography variant="subtitle2">{`${today.dayString}`}</Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {`${Number(today.DD)}일 시험일정`}
        </Typography>
      </Box>
      <Box
        sx={{
          gridArea: "todaySchedule",
          backgroundColor: SignatureColor.WHITE,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          mb: isWidthShort ? 2 : 0,
          borderRight: `5px solid ${SignatureColor.GRAY}`,
        }}
      >
        <>
          {examScheduleListQuery.data.map((examSchedule) => {
            if (examSchedule.examDate !== today.YYYY_MM_DD) return null;
            return (
              <Box
                sx={{
                  ml: 4,
                  mr: 4,
                  pb: 0.5,
                  pt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={examSchedule.id}
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
                  {examSchedule.organizer}
                </Typography>
                <Button
                  onClick={() => {
                    navigation(`/exam-schedule#${examSchedule.id}`);
                  }}
                >
                  공고확인
                </Button>
              </Box>
            );
          })}
        </>
      </Box>
      <Box
        sx={{
          gridArea: "nextSchedules",
          height: isWidthShort ? 150 : 200,
          overflow: "scroll",
          backgroundColor: SignatureColor.WHITE,
          borderTopLeftRadius: isWidthShort ? 10 : 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: isWidthShort ? 10 : 0,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            pl: 2,
            pt: 1,
          }}
        >
          {"이후 시험일정"}
        </Typography>
        <>
          {examScheduleListQuery.data.map((examSchedule) => {
            if (examSchedule.examDate === today.YYYY_MM_DD) return null;
            return (
              <Box
                sx={{
                  ml: 4,
                  mr: 4,
                  pb: 0.5,
                  pt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={examSchedule.id}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    width: 40,
                  }}
                >
                  {`${new Date(examSchedule.examDate).getDate()}일`}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: 200,
                    flex: 1,
                  }}
                >
                  {examSchedule.organizer}
                </Typography>
                <Button
                  onClick={() => {
                    navigation(`/exam-schedule#${examSchedule.id}`);
                  }}
                >
                  공고확인
                </Button>
              </Box>
            );
          })}
        </>
      </Box>
    </Box>
  );
};

const ScheduelSummaryBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    backgroundColor: SignatureColor.GRAY,
    padding: isWidthShort ? theme.spacing(3) : theme.spacing(6),
    display: isWidthShort ? "flex" : "grid",
    flexFlow: isWidthShort ? "column" : "unset",
    gridTemplateColumns: isWidthShort ? "unset" : `repeat(2, 1fr)`,
    gridTemplateRows: isWidthShort ? "unset" : `60px auto`,
    gridTemplateAreas: isWidthShort
      ? "unset"
      : `
        "today nextSchedules"
        "todaySchedule nextSchedules"
    `,
  });
