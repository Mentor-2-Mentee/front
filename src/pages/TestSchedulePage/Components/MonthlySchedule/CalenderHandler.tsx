import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, IconButton, Typography } from "@mui/material";
import { CurrentDate } from ".";
import { useContext } from "react";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useNavigate } from "react-router";
import { userGradeCheck } from "../../../../utils/userGradeCheck";

interface CalenderHandlerProps {
  useCurrentDateState: [
    CurrentDate,
    React.Dispatch<React.SetStateAction<CurrentDate>>
  ];
}

export const CalenderHandler = ({
  useCurrentDateState,
}: CalenderHandlerProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const [currentDate, setCurrentDate] = useCurrentDateState;
  const navigation = useNavigate();
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
    <>
      {userGradeCheck(["master", "admin"], userGrade) ? (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 1, mr: 1 }}
            onClick={() => {
              navigation("/create_test-schedule");
            }}
          >
            시험일정 등록
          </Button>
        </div>
      ) : null}
      <CalenderHandlerContainer>
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
      </CalenderHandlerContainer>
    </>
  );
};

const CalenderHandlerContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

export default CalenderHandler;
