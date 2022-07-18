import { useRef, useState } from "react";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useInfiniteQuery } from "react-query";

import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import InfinityScroll from "../../commonElements/InfinityScroll";
import { RoomElement } from "../../commonElements/RoomList";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import { getLiveRoomList } from "../../api/getLiveRoomList";

import DEV_DATA from "./DEV_DATA.json";

const LIVE_ROOMS_LIMIT = 6;

export const MentoringRoomsPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const getLiveRoomListForINF = async ({ pageParam = 0 }) => {
    return await getLiveRoomList({
      filter: appliedTagOptions,
      page: pageParam,
      limit: LIVE_ROOMS_LIMIT,
    });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["live-rooms"], getLiveRoomListForINF, {
    getNextPageParam: (lastPage, page) => lastPage.nextPage,
  });

  return (
    <MentoringRoomsPageContainer ref={containerRef}>
      <FilterOptionHandler
        tagList={DEV_DATA.FILTER_OPTION_ELEMENTS}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
      />
      <hr />
      <RoomListGridContainer>
        {status === "loading" || data === undefined ? (
          <CircularProgress />
        ) : (
          <>
            {data.pages.map((group, index) => {
              return (
                <InfinityScroll
                  key={index}
                  listElements={group.data}
                  fetchElementFunction={fetchNextPage}
                  observerOption={{
                    root: null,
                    threshold: 0,
                  }}
                  hasNextPage={hasNextPage}
                  targetContainer={containerRef}
                  renderElement={(elementProps, index) => {
                    return (
                      <RoomElement
                        key={elementProps.roomId + index}
                        roomValue={elementProps}
                        isLive={true}
                      />
                    );
                  }}
                />
              );
            })}
          </>
        )}
      </RoomListGridContainer>
      <CreateQuestionRoomButton />
    </MentoringRoomsPageContainer>
  );
};

const MentoringRoomsPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(
    4,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN,
    CommonSpace.MARGIN
  ),
}));

const RoomListGridContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "wrap",
  marginRight: theme.spacing(4),
}));

export default MentoringRoomsPage;
