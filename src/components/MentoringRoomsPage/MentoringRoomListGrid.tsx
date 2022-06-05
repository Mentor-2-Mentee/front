import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import {
  RoomListProps,
  RoomParams,
  RoomElement,
} from "../../commonElements/RoomList";

import DEV_DATA from "./DEV_DATA.json";
import InfinityScroll, {
  useInfiniteScroll,
} from "../../commonElements/InfinityScroll";

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
    console.log("방갯수:", roomList.length + newRoomList.length);
  }, [nowPage]);

  const getMoreIElements = async () => {
    if (nowPage === maxPage) return;
    await insertDelay();
    setNowPage(nowPage + 1);
    return;
  };

  const { count } = useInfiniteScroll({
    target: target,
    targetArray: roomList,
    threshold: 0.2,
    pageSize: 5,
    endPoint: 3,
  });

  useEffect(() => {
    getMoreIElements();
  }, [count]);

  return (
    <RoomListGridContainer>
      {/* <InfinityScroll
        listElements={roomList}
        getMoreIElements={getMoreIElements}
        observerOption={{
          root: null,
          threshold: 1.0,
        }}
        renderElement={(data, index) => {
          return <RoomElement key={index} roomValue={data} isLive={true} />;
        }}
      /> */}

      <RoomListGridContainer ref={target}>
        {roomList.map((ele) => {
          return <RoomElement roomValue={ele} isLive />;
        })}
      </RoomListGridContainer>
    </RoomListGridContainer>
  );
};

const RoomListGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "wrap",

  "& > *": {
    marginRight: theme.spacing(4),
  },
}));
