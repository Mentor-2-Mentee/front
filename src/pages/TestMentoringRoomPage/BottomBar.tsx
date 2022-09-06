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
  bottomBarElement: React.RefObject<HTMLDivElement>;
}

export const BottomBar = ({ bottomBarElement }: BottomBarProps) => {
  return (
    <BottomNavigation
      showLabels
      sx={{
        width: "100%",
        position: "absolute",
        bottom: 0,
        borderTop: `1px solid ${SignatureColor.GRAY_BORDER}`,
        backgroundColor: SignatureColor.WHITE,
        zIndex: 10,
      }}
      ref={bottomBarElement}
    >
      <BottomNavigationAction label="이전문제" icon={<ChevronLeftIcon />} />
      <BottomNavigationAction
        label="현재문제"
        icon={<Typography variant="subtitle1">1/20</Typography>}
      />
      <BottomNavigationAction label="다음문제" icon={<ChevronRightIcon />} />
    </BottomNavigation>
  );
};

export default BottomBar;
