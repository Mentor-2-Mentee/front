import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { RoomParams, RoomElement } from "../../commonElements/RoomList";

import DEV_DATA from "./DEV_DATA.json";
import InfinityScroll from "../../commonElements/InfinityScroll";

const insertDelay = (delay: number = 1000) =>
  new Promise((res) => setTimeout(res, delay));

const DEV_ROOM_LIST_API_PARAMS = {
  limit: 6,
  maxPage: 5,
};

export const MentoringRoomListGrid = (): JSX.Element => {
  const [roomList, setRoomList] = useState<RoomParams[]>([]);

  const [nowPage, setNowPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const maxPage = DEV_ROOM_LIST_API_PARAMS.maxPage;
  const limit = DEV_ROOM_LIST_API_PARAMS.limit;

  useEffect(() => {
    const newRoomList = DEV_DATA.ROOM_LIST.slice(
      nowPage * limit,
      (nowPage + 1) * limit
    );
    setRoomList([...roomList, ...newRoomList]);
    console.log("방갯수:", roomList.length + newRoomList.length, roomList);
  }, [nowPage]);

  const getMoreIElements = async () => {
    console.log(nowPage);
    try {
      if (nowPage + 1 >= maxPage) {
        throw new Error("마지막페이지입니다.");
      }
      await insertDelay();
      setNowPage(nowPage + 1);
    } catch (error) {
      throw new Error("마지막페이지입니다!!.");
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(containerRef);
  }, []);

  return (
    <RoomListGridContainer ref={containerRef}>
      <InfinityScroll
        listElements={roomList}
        fetchElementFunction={getMoreIElements}
        observerOption={{
          root: null,
          threshold: 0,
        }}
        limit={limit}
        maxPage={maxPage}
        targetContainer={containerRef}
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
  display: "flex",
  flexFlow: "wrap",
  marginRight: theme.spacing(4),
}));
