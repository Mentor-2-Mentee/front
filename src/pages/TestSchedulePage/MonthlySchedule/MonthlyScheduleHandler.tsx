import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { IconButton, Typography } from "@mui/material";
import { CurrentDate } from ".";

interface MonthlyScheduleHandlerProps {
  useCurrentDateState: [
    CurrentDate,
    React.Dispatch<React.SetStateAction<CurrentDate>>
  ];
}

export const MonthlyScheduleHandler = ({
  useCurrentDateState,
}: MonthlyScheduleHandlerProps): JSX.Element => {
  const [currentDate, setCurrentDate] = useCurrentDateState;
  const handleLeftButton = () => {
    if (currentDate.month === 0) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 11,
      });
      return;
    }

    return setCurrentDate({
      ...currentDate,
      month: currentDate.month - 1,
    });
  };

  const handleRightButton = () => {
    if (currentDate.month === 11) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 0,
      });
      return;
    }

    return setCurrentDate({
      ...currentDate,
      month: currentDate.month + 1,
    });
  };

  return (
    <MonthlyScheduleHandlerContainer>
      <IconButton onClick={handleLeftButton}>
        <ChevronLeftIcon
          sx={(theme) => ({
            fontSize: theme.spacing(5),
          })}
        />
      </IconButton>
      <Typography
        variant="h5"
        sx={(theme) => ({
          ml: theme.spacing(3),
          mr: theme.spacing(3),
        })}
      >
        {`${currentDate.year}.${currentDate.month + 1}`}
      </Typography>
      <IconButton onClick={handleRightButton}>
        <ChevronRightIcon
          sx={(theme) => ({
            fontSize: theme.spacing(5),
          })}
        />
      </IconButton>
    </MonthlyScheduleHandlerContainer>
  );
};

const MonthlyScheduleHandlerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export default MonthlyScheduleHandler;
