import {
  Box,
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { SignatureColor } from "../../commonStyles/CommonColor";

interface BottomBarProps {
  questionCount: number;
  useNowQuestionIndexState: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ];
}

export const BottomBar = ({
  questionCount,
  useNowQuestionIndexState,
}: BottomBarProps) => {
  const [nowQuestionIndex, setNowQuestionIndex] = useNowQuestionIndexState;

  const handleLeftButton = () => {
    if (nowQuestionIndex === 0) return;
    setNowQuestionIndex(nowQuestionIndex - 1);
  };

  const handleRightButton = () => {
    if (nowQuestionIndex + 1 === questionCount) return;
    setNowQuestionIndex(nowQuestionIndex + 1);
  };

  return (
    <BottomNavigation
      showLabels
      sx={(theme) => ({
        width: "100%",
        borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
        backgroundColor: SignatureColor.GRAY,
        height: theme.spacing(6),
      })}
    >
      <BottomNavigationAction
        label="이전문제"
        icon={<ChevronLeftIcon />}
        onClick={handleLeftButton}
      />
      <BottomNavigationAction
        label="현재문제"
        icon={
          <Typography variant="subtitle1">{`${
            nowQuestionIndex + 1
          }/${questionCount}`}</Typography>
        }
      />
      <BottomNavigationAction
        label="다음문제"
        icon={<ChevronRightIcon />}
        onClick={handleRightButton}
      />
    </BottomNavigation>
  );
};

export default BottomBar;
