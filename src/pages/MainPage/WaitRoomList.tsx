import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { RoomListRow, RoomParams } from "../../commonElements/RoomList";
import { MainPageContentsColor } from "../../commonStyles/CommonColor";
import { CommonSpace } from "../../commonStyles/CommonSpace";

// import DEV_DATA from "./DEV_DATA.json";

export const WaitRoomList = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>([]);

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
      <RoomListRow roomList={roomList} isLive={false} />
    </WaitRoomListContainer>
  );
};

const WaitRoomListContainer = styled("div")(({ theme }) => ({
  backgroundColor: MainPageContentsColor.WAIT_ROOM_LIST,
  padding: theme.spacing(CommonSpace.MARGIN),
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

export default WaitRoomList;
