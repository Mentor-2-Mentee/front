import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import LiveAlarmBox from "../../commonElements/LiveAlarmBox";
import RoomList, { RoomParams } from "../../commonElements/RoomList";

import DEV_DATA from "./DEV_DATA.json";

export const LiveRoomList = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>(DEV_DATA.ROOM_LIST);

  return (
    <LiveRoomListContainer>
      <Header>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mr: 3 }}
        >
          현재 진행중인 질의응답
        </Typography>
        <LiveAlarmBox />
      </Header>
      <RoomList roomList={roomList} isLive />
    </LiveRoomListContainer>
  );
};

const LiveRoomListContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#00000018",
  padding: theme.spacing(3, 5, 4, 5),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default LiveRoomList;
