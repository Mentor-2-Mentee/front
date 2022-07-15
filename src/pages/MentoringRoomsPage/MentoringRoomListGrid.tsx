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

interface MentoringRoomListGridProps {
  useRoomListState: [
    RoomParams[],
    React.Dispatch<React.SetStateAction<RoomParams[]>>
  ];
  fetchElementFunction: () => Promise<void>;
}

export const MentoringRoomListGrid = ({
  useRoomListState,
  fetchElementFunction,
}: MentoringRoomListGridProps): JSX.Element => {
  const [roomList, setRoomList] = useRoomListState;

  const containerRef = useRef<HTMLDivElement>(null);
  const maxPage = DEV_ROOM_LIST_API_PARAMS.maxPage;
  const limit = DEV_ROOM_LIST_API_PARAMS.limit;

  return (
    <RoomListGridContainer ref={containerRef}>
      <InfinityScroll
        listElements={roomList}
        fetchElementFunction={fetchElementFunction}
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
