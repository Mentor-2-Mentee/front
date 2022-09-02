import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { CurrentDate } from ".";
import { SignatureColor } from "../../../../commonStyles/CommonColor";
import {
  TestSchedule,
  useGetTestScheduleQuery,
} from "../../../../hooks/queries/testSchedule";
import DateFormatting from "../../../../utils/dateFormatting";
import { useEffect, useState } from "react";
import ScheduleModal from "./ScheduleModal";
import { useLocation, useNavigate } from "react-router";

interface ScheduleGridProps {
  currentDate: CurrentDate;
  currentMonthlyDayList: string[];
  currentMonthlyScheduleList: TestSchedule[];
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
  const hashedTestScheduleId = Number(hash.substr(1));
  const today = new DateFormatting(new Date()).YYYY_MM_DD;

  const testScheduleQuery = useGetTestScheduleQuery({
    testScheduleId: hashedTestScheduleId,
  });

  const handleTestScheduleClick = (testScheduleId: number) => {
    navigation(`/test-schedule#${testScheduleId}`);
  };

  useEffect(() => {
    if (testScheduleQuery.status !== "success") return;
    setModalOpen(true);
  }, [testScheduleQuery.status, setModalOpen]);

  return (
    <ScheduleGridContainer>
      {currentMonthlyDayList.map((currentDay) => {
        const dayScheduleList = currentMonthlyScheduleList.filter(
          (schedule) => schedule.testDate === currentDay
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
              {renderTestScheduleList(dayScheduleList, handleTestScheduleClick)}
            </DailyScheduleHeaderElement>
          </DailySchedule>
        );
      })}
      <>
        {testScheduleQuery.status !== "success" ? null : (
          <ScheduleModal
            useIsOpenState={[modalOpen, setModalOpen]}
            testSchedule={testScheduleQuery.data}
          />
        )}
      </>
    </ScheduleGridContainer>
  );
};

const renderTestScheduleList = (
  testScheduleList: TestSchedule[],
  handleTestScheduleClick: (testScheduleId: number) => void
) => {
  if (testScheduleList.length === 0) return <div>{null}</div>;

  return testScheduleList.map((testSchedule) => {
    return (
      <TestScheduleContainer
        onClick={() => {
          handleTestScheduleClick(testSchedule.testScheduleId);
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
          {testSchedule.testField[0]}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            display: "flex",
            alignItems: "center",
            ml: 1,
          }}
        >
          {testSchedule.testScheduleTitle}
        </Typography>
      </TestScheduleContainer>
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

const TestScheduleContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  "&:hover": {
    background: SignatureColor.GRAY_BORDER,
    cursor: "pointer",
  },
}));

export default ScheduleGrid;
