import { styled, SxProps } from "@mui/system";
import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { Current_YYYY_MM } from ".";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import {
  ExamSchedule,
  useGetExamScheduleQuery,
} from "../../../../hooks/queries/examSchedule";
import DateFormatting from "../../../../utils/dateFormatting";
import { useContext, useEffect, useState } from "react";
import ScheduleModal from "./ScheduleModal";
import { useLocation, useNavigate } from "react-router";
import CircleIcon from "@mui/icons-material/Circle";
import { ExamScheduleContext } from "../..";

interface ScheduleGridProps {
  current_YYYY_MM: Current_YYYY_MM;
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
  current_YYYY_MM,
  currentMonthlyDayList,
  currentMonthlyScheduleList,
}: ScheduleGridProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { hash } = useLocation();
  const navigation = useNavigate();
  const hashedExamScheduleId = Number(hash.substr(1));
  const today = new DateFormatting(new Date()).YYYY_MM_DD;

  const { setExamScheduleContextState } = useContext(ExamScheduleContext);

  const [selectedDay, setSelectedDay] = useState<string>(today);

  const isWidthShort = useMediaQuery("(max-width:900px)");

  const examScheduleQuery = useGetExamScheduleQuery({
    examScheduleId: hashedExamScheduleId,
  });

  const handleExamScheduleClick = (examScheduleId: number) => {
    navigation(`/exam-schedule#${examScheduleId}`);
  };

  const handleDailyScheduleClick =
    (targetDay: string, dailyScheduleList: ExamSchedule[]) => () => {
      setSelectedDay(targetDay);
      setExamScheduleContextState((currentState) => ({
        ...currentState,
        selectedDayScheduleList: dailyScheduleList,
      }));
    };

  useEffect(() => {
    const dailyScheduleList = currentMonthlyScheduleList.filter(
      (schedule) => schedule.examDate === today
    );
    setExamScheduleContextState((currentState) => ({
      ...currentState,
      selectedDayScheduleList: dailyScheduleList,
    }));
  }, [today]);

  useEffect(() => {
    if (examScheduleQuery.status !== "success") return;
    if (examScheduleQuery.data === null) {
      navigation(`/error`);
      return;
    }
    setModalOpen(true);
  }, [examScheduleQuery.status, setModalOpen]);

  return (
    <Box sx={ScheduleGridBoxSxProps}>
      {currentMonthlyDayList.map((currentDay) => {
        const dailyScheduleList = currentMonthlyScheduleList.filter(
          (schedule) => schedule.examDate === currentDay
        );
        const isToday = Boolean(today === currentDay);
        const isSelected = Boolean(selectedDay === currentDay);
        return (
          <Box
            key={currentDay}
            sx={DailyScheduleBoxSxProps(isToday)}
            onClick={handleDailyScheduleClick(currentDay, dailyScheduleList)}
          >
            <Typography
              variant="subtitle1"
              sx={DailyScheduleHeaderSxProps(
                isSelected,
                current_YYYY_MM,
                currentDay
              )}
            >
              {new Date(currentDay).getDate()}
            </Typography>

            {isWidthShort ? (
              <Box sx={DailyScheduleMarkerSxProps}>
                {dailyScheduleList.length !== 0 ? (
                  <CircleIcon sx={CircleIconSxProps} />
                ) : null}
              </Box>
            ) : (
              <DailyScheduleHeaderElement>
                {renderExamScheduleList(
                  dailyScheduleList,
                  handleExamScheduleClick
                )}
              </DailyScheduleHeaderElement>
            )}
          </Box>
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
    </Box>
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

const ScheduleGridBoxSxProps: SxProps = {
  display: "grid",
  gridTemplateColumns: `repeat(7, calc(100% / 7))`,
};

const DailyScheduleBoxSxProps =
  (isToday: Boolean): SxProps =>
  () => ({
    display: "flex",
    flexFlow: "column",
    border: isToday ? `2px solid ${SignatureColor.RED}` : "",
    boxSizing: "border-box",
  });

const DailyScheduleHeaderSxProps =
  (
    isSelected: Boolean,
    current_YYYY_MM: Current_YYYY_MM,
    currentDay: string
  ): SxProps =>
  () => ({
    color: isSelected ? SignatureColor.WHITE : setDayColor(currentDay),
    backgroundColor: isSelected ? SignatureColor.BLACK_80 : SignatureColor.GRAY,
    filter: setDayFilter(current_YYYY_MM.month, currentDay),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${SignatureColor.WHITE}`,
    fontWeight: 600,
  });

const CircleIconSxProps: SxProps = {
  fontSize: 10,
  mt: 1,
  mb: 1,
  color: SignatureColor.BLACK_50,
};

const DailyScheduleMarkerSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  minHeight: 26,
};

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
