import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  BottomNavigationAction,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { RootContext } from "../../hooks/context/RootContext";
import { chatSocketQueryClient } from "../../hooks/queries/liveChat";
import { userGradeCheck } from "../../utils/userGradeCheck";
import LiveChat from "../RoomPage/LiveChat";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { BottomBar } from "./BottomBar";
import SwipeableChat from "./SwipeableChat";
import TopBar from "./TopBar";
import Question from "./Question";

export const TestMentoringRoomPage = (): JSX.Element => {
  const { userGrade } = useContext(RootContext);

  const bottomBarElement = useRef<HTMLDivElement>(null);
  const targetContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <TestMentoringRoomContainer>
      <TopBar />

      <Question />

      <QueryClientProvider client={chatSocketQueryClient}>
        <LiveChat nonHeader fullWidth />
      </QueryClientProvider>

      {/* <SwipeableChat /> */}
      <BottomBar bottomBarElement={bottomBarElement} />
    </TestMentoringRoomContainer>
  );
};

const TestMentoringRoomContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column",
  backgroundColor: SignatureColor.GRAY,
  overflow: "hidden",
}));

export default TestMentoringRoomPage;
