import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, IconButton, Typography } from "@mui/material";
import { Current_YYYY_MM } from ".";
import { useContext } from "react";
import { RootContext } from "../../../../hooks/context/RootContext";
import { useNavigate } from "react-router";
import { userGradeCheck } from "../../../../utils/userGradeCheck";

interface CalenderHandlerProps {
  useCurrent_YYYY_MM_State: [
    Current_YYYY_MM,
    React.Dispatch<React.SetStateAction<Current_YYYY_MM>>
  ];
}

export const CalenderHandler = ({
  useCurrent_YYYY_MM_State,
}: CalenderHandlerProps): JSX.Element => {
  const { userGrade } = useContext(RootContext);
  const [current_YYYY_MM, setCurrent_YYYY_MM] = useCurrent_YYYY_MM_State;
  const navigation = useNavigate();
  const handleLeftButton = () => {
    if (current_YYYY_MM.month === 0) {
      setCurrent_YYYY_MM({
        year: current_YYYY_MM.year - 1,
        month: 11,
      });
      return;
    }

    return setCurrent_YYYY_MM({
      ...current_YYYY_MM,
      month: current_YYYY_MM.month - 1,
    });
  };

  const handleRightButton = () => {
    if (current_YYYY_MM.month === 11) {
      setCurrent_YYYY_MM({
        year: current_YYYY_MM.year + 1,
        month: 0,
      });
      return;
    }

    return setCurrent_YYYY_MM({
      ...current_YYYY_MM,
      month: current_YYYY_MM.month + 1,
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
              navigation("/create-exam-schedule");
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
          {`${current_YYYY_MM.year}.${current_YYYY_MM.month + 1}`}
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

const CalenderHandlerContainer = styled("div")(({}) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
}));

export default CalenderHandler;
