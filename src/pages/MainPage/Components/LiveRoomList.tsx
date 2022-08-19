import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  getLiveRoomList,
  GetLiveRoomListParams,
} from "../../../api/getLiveRoomList";
import LiveAlarmBox from "../../../commonElements/LiveAlarmBox";
import { RoomListRow, RoomParams } from "../../../commonElements/RoomList";
import { MainPageContentsColor } from "../../../commonStyles/CommonColor";
import { CommonSpace } from "../../../commonStyles/CommonSpace";

export const LiveRoomList = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>([]);
  const config: GetLiveRoomListParams = {
    filter: {
      rootFilterTag: undefined,
      childFilterTags: [],
      filterKeywords: [],
    },
    page: 0,
    limit: 10,
  };

  const { data, error } = useQuery(["main_liveRoomList", config], () =>
    getLiveRoomList(config)
  );

  useEffect(() => {
    if (data === undefined) return;
    setRoomList(data?.data);
  }, [data]);

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
      <RoomListRow roomList={roomList} />
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
