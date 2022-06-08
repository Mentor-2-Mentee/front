import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import LiveAlarmBox from "../../commonElements/LiveAlarmBox";
import { RoomListRow, RoomParams } from "../../commonElements/RoomList";
import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import { CommonSpace } from "../../commonStyles/CommonSpace";

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
      <RoomListRow roomList={roomList} isLive />
    </LiveRoomListContainer>
  );
};

const LiveRoomListContainer = styled("div")(({ theme }) => ({
  backgroundColor: MainPageContentsColor.LIVE_ROOM_LIST,
  padding: theme.spacing(CommonSpace.MARGIN),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default LiveRoomList;
