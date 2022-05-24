import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import LiveAlarmBox from "../../commonElements/LiveAlarmBox";
import RoomList from "./RoomList";

const LIVE_ROOM_LIST_DEV: LiveRoomParams[] = [
  {
    roomId: "14sw4",
    title: "중진공 면접후기",
    author: "공부하는 아몬드",
    authorColor: "#159330",
    createdAt: "2022-05-24T18:20",
    startedAt: "2022-05-24T18:45",
    thumbnailImgURL: "test",
  },
  {
    roomId: "145sw4",
    title: "화공기사 19년 2회 필답 5번 이거맞나요?",
    author: "쿨쿨자는 쿨피스",
    authorColor: "#e46b2a",
    createdAt: "2022-05-24T18:20",
    startedAt: "2022-05-24T18:45",
    thumbnailImgURL: "test",
  },
  {
    roomId: "145sw4",
    title:
      "너무나 궁금한게 많아서 엄청나게 길고 길고 길어서 다 보지 못하는 질문",
    author: "졸린 졸라비",
    authorColor: "#65cff9",
    createdAt: "2022-05-24T18:20",
    startedAt: "2022-05-24T18:45",
    thumbnailImgURL: "test",
  },
  {
    roomId: "14s2asdw4",
    title: "여기서 상자기성이 더 작다는게 무슨말이죠??",
    author: "배부른 매부리코원숭이",
    authorColor: "#1da55b",
    createdAt: "2022-05-24T18:20",
    startedAt: "2022-05-24T18:45",
    thumbnailImgURL: "test",
  },
  {
    roomId: "14sw2444",
    title: "서부발전 현직자분 질문드립니다",
    author: "시험보는 땅콩",
    authorColor: "#fa5eaf",
    createdAt: "2022-05-24T18:20",
    startedAt: "2022-05-24T18:45",
    thumbnailImgURL: "test",
  },
];

export interface LiveRoomParams {
  roomId: string;
  title: string;
  author: string;
  authorColor: string;
  createdAt: string;
  startedAt: string;
  thumbnailImgURL: string;
}

export const LiveRoomList = (): JSX.Element => {
  const [roomList, setRoomList] =
    useState<LiveRoomParams[]>(LIVE_ROOM_LIST_DEV);

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
      <RoomList roomList={roomList} />
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
