import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import MonthlySchedule from "./Components/MonthlySchedule";
import { DailyScheduleSummary } from "./Components/DailyScheduleSummary";
import { ExamSchedule } from "../../hooks/queries/examSchedule";
import { createContext, SetStateAction, Dispatch, useState } from "react";

interface ExamsScheduleContextState {
  selectedDayScheduleList: ExamSchedule[];
}

interface ExamsScheduleContextProps extends ExamsScheduleContextState {
  setExamScheduleContextState: Dispatch<
    SetStateAction<ExamsScheduleContextState>
  >;
}

export const ExamScheduleContext = createContext<ExamsScheduleContextProps>({
  selectedDayScheduleList: [],
  setExamScheduleContextState: () => {},
});

export const ExamSchedulePage = (): JSX.Element => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [examScheduleContextState, setExamScheduleContextState] =
    useState<ExamsScheduleContextState>({
      selectedDayScheduleList: [],
    });
  return (
    <ExamSchedulePageContainer>
      <ExamScheduleContext.Provider
        value={{
          ...examScheduleContextState,
          setExamScheduleContextState,
        }}
      >
        <MonthlySchedule />
        {isWidthShort ? <DailyScheduleSummary /> : null}
      </ExamScheduleContext.Provider>
    </ExamSchedulePageContainer>
  );
};

const ExamSchedulePageContainer = styled("div")(({}) => ({
  display: "grid",
}));

export default ExamSchedulePage;
