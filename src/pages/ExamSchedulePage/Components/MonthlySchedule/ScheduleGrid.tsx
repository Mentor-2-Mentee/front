import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { CurrentDate } from ".";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import {
  ExamSchedule,
  useGetExamScheduleQuery,
} from "../../../../hooks/queries/examSchedule";
import DateFormatting from "../../../../utils/dateFormatting";
import { useEffect, useState } from "react";
import ScheduleModal from "./ScheduleModal";
import { useLocation, useNavigate } from "react-router";

interface ScheduleGridProps {
  currentDate: CurrentDate;
  currentMonthlyDayList: string[];
  currentMonthlyScheduleList: ExamSchedule[];
}

const setDayColor = (date: string): SignatureColor => {
  const day = new Date(date).getDay();
  if (day === 0) return SignatureColor.RED;
  if (day === 6) return SignatureColor.BLUE;
  return SignatureColor.BLACK_80;
};
const setDayFilter = (currentMonth: number, date: string) => {
  if (currentMonth !== new Date(date).getMonth()) return "opacity(50%)";
};
export const ScheduleGrid = ({
  currentDate,
  currentMonthlyDayList,
  currentMonthlyScheduleList,
}: ScheduleGridProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { hash } = useLocation();
  const navigation = useNavigate();
  const hashedExamScheduleId = Number(hash.substr(1));
  const today = new DateFormatting(new Date()).YYYY_MM_DD;

  const examScheduleQuery = useGetExamScheduleQuery({
    examScheduleId: hashedExamScheduleId,
  });

  const handleExamScheduleClick = (examScheduleId: number) => {
    navigation(`/exam-schedule#${examScheduleId}`);
  };

  useEffect(() => {
    if (examScheduleQuery.status !== "success") return;
    console.log(examScheduleQuery.data);
    if (examScheduleQuery.data === null) {
      navigation(`/error`);
      return;
    }
    setModalOpen(true);
  }, [examScheduleQuery.status, setModalOpen]);

  return (
    <ScheduleGridContainer>
      {currentMonthlyDayList.map((currentDay) => {
        const dayScheduleList = currentMonthlyScheduleList.filter(
          (schedule) => schedule.examDate === currentDay
        );
        const isToday = Boolean(today === currentDay);

        return (
          <DailySchedule
            key={currentDay.toString()}
            sx={{
              border: isToday ? `2px solid ${SignatureColor.RED}` : "",
              boxSizing: "border-box",
            }}
          >
            <DailyScheduleHeader
              sx={{
                color: setDayColor(currentDay),
                filter: setDayFilter(currentDate.month, currentDay),
              }}
            >
              {new Date(currentDay).getDate()}
            </DailyScheduleHeader>
            <DailyScheduleHeaderElement>
              {renderExamScheduleList(dayScheduleList, handleExamScheduleClick)}
            </DailyScheduleHeaderElement>
          </DailySchedule>
        );
      })}
      <>
        {examScheduleQuery.status !== "success" ||
        examScheduleQuery.data === null ? null : (
          <ScheduleModal
            useIsOpenState={[modalOpen, setModalOpen]}
            examSchedule={examScheduleQuery.data}
          />
        )}
      </>
    </ScheduleGridContainer>
  );
};

const renderExamScheduleList = (
  examScheduleList: ExamSchedule[],
  handleExamScheduleClick: (examScheduleId: number) => void
) => {
  if (examScheduleList.length === 0) return <div>{null}</div>;

  return examScheduleList.map((examSchedule) => {
    return (
      <ExamScheduleContainer
        onClick={() => {
          handleExamScheduleClick(examSchedule.examScheduleId);
        }}
      >
        <Typography
          variant="body2"
          sx={(theme) => ({
            ml: 1,
            width: theme.spacing(2),
            height: theme.spacing(2),
            background: "#fecd0a",
            borderRadius: theme.spacing(0.5),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          {examSchedule.examField[0]}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            ml: 1,
          }}
        >
          {examSchedule.examScheduleTitle}
        </Typography>
      </ExamScheduleContainer>
    );
  });
};

const ScheduleGridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(7, calc(100% / 7))`,
}));

const DailySchedule = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
}));

const DailyScheduleHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: SignatureColor.GRAY,
  border: `1px solid ${SignatureColor.WHITE}`,
  boxSizing: "border-box",
  padding: theme.spacing(0.25, 0, 0.25, 0),
  fontWeight: 600,
}));

const DailyScheduleHeaderElement = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: theme.spacing(10),
  flexFlow: "column",
}));

const ExamScheduleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  "&:hover": {
    background: SignatureColor.GRAY_BORDER,
    cursor: "pointer",
  },
}));

export default ScheduleGrid;
