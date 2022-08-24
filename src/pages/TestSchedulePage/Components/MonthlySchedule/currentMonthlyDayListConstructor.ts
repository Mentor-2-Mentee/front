import { EffectCallback } from "react";
import { CurrentDate } from ".";

enum Day {
  SUN = 0,
  MON = 1,
  TUE = 2,
  WED = 3,
  THR = 4,
  FRI = 5,
  SAT = 6,
}

export const currentMonthlyDayListConstructor = (
  currentDate: CurrentDate,
  setCurrentMonthlyDayList: React.Dispatch<React.SetStateAction<Date[]>>
): EffectCallback => {
  const endOfCurrentMonthDate = new Date(
    currentDate.year,
    currentDate.month + 1,
    0
  );

  const prevMonth: Date[] = [];
  const nextMonth: Date[] = [];
  const currentMonth: Date[] = [
    ...Array(endOfCurrentMonthDate.getDate()).keys(),
  ].map((dayIndex) => {
    const date = new Date(currentDate.year, currentDate.month, dayIndex + 1);

    if (dayIndex === 0 && date.getDay() !== Day.SUN) {
      [...Array(date.getDay()).keys()].map((prevMonthIndex) => {
        prevMonth.unshift(
          new Date(
            currentDate.year,
            currentDate.month,
            dayIndex + 1 - (prevMonthIndex + 1)
          )
        );
      });
    }

    if (
      dayIndex === endOfCurrentMonthDate.getDate() - 1 &&
      date.getDay() !== Day.SAT
    ) {
      [...Array(Day.SAT - date.getDay()).keys()].map((nextMonthIndex) => {
        nextMonth.push(
          new Date(
            currentDate.year,
            currentDate.month,
            dayIndex + 1 + nextMonthIndex + 1
          )
        );
      });
    }

    return date;
  });
  return () => {
    setCurrentMonthlyDayList([...prevMonth, ...currentMonth, ...nextMonth]);
  };
};
