import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import { RoomListRow } from "../../../commonElements/RoomList";
import { MainPageContentsColor } from "../../../commonStyles/CommonColor";
import { CommonSpace } from "../../../commonStyles/CommonSpace";
import { MentoringRoom } from "../../../hooks/queries/mentoringRoom";

export const WaitRoomList = (): JSX.Element => {
  const [roomList, setRoomList] = useState<MentoringRoom[]>([]);

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
      <RoomListRow roomList={roomList} />
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
