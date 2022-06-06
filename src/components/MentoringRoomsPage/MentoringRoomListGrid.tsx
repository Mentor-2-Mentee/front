import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import {
  RoomListProps,
  RoomParams,
  RoomElement,
} from "../../commonElements/RoomList";

import DEV_DATA from "./DEV_DATA.json";
import InfinityScroll from "../../commonElements/InfinityScroll";

const insertDelay = (delay: number = 1000) =>
  new Promise((res) => setTimeout(res, delay));

export const MentoringRoomListGrid = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>([]);
  const [nowPage, setNowPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const target = useRef<Element>(null);

  const maxPage = 5;
  // const observeElementRef = useRef<JSX.Element>();

  useEffect(() => {
    const newRoomList = DEV_DATA.ROOM_LIST.slice(
      nowPage * 6,
      (nowPage + 1) * 6
    );
    setRoomList([...roomList, ...newRoomList]);
    console.log("방갯수:", roomList.length + newRoomList.length, roomList);
  }, [nowPage]);

  const getMoreIElements = async () => {
    if (nowPage === maxPage) return;
    await insertDelay();
    setNowPage(nowPage + 1);
    return;
  };

  return (
    <RoomListGridContainer>
      <InfinityScroll
        listElements={roomList}
        fetchElementFunction={getMoreIElements}
        observerOption={{
          root: null,
          threshold: 1.0,
        }}
        renderElement={(elementProps) => {
          return (
            <RoomElement
              key={elementProps.roomId}
              roomValue={elementProps}
              isLive={true}
            />
          );
        }}
      />
    </RoomListGridContainer>
  );
};

const RoomListGridContainer = styled("div")(({ theme }) => ({
  "& > *": {
    display: "flex",
    flexFlow: "wrap",
    marginRight: theme.spacing(4),
  },
}));
