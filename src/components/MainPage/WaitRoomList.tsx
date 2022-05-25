import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import RoomList, { RoomParams } from "./RoomList";

import DEV_DATA from "./DEV_ROOM_DATA.json";

export const WaitRoomList = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>(DEV_DATA.ROOM_LIST);

  return (
    <WaitRoomListContainer>
      <Header>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mr: 3 }}
        >
          답변을 기다리는 문제들
        </Typography>
      </Header>
      <RoomList roomList={roomList} isLive={false} />
    </WaitRoomListContainer>
  );
};

const WaitRoomListContainer = styled("div")(({ theme }) => ({
  backgroundColor: "#00000063",
  padding: theme.spacing(3, 5, 4, 5),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default WaitRoomList;
