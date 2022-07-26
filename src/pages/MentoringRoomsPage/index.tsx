import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/system";
import { CircularProgress } from "@mui/material";
import {
  useInfiniteQuery,
  QueryClient,
  useQueryClient,
  QueryCache,
} from "react-query";

import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import InfinityScroll from "../../commonElements/InfinityScroll";
import { RoomElement } from "../../commonElements/RoomList";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import { getLiveRoomList } from "../../api/getLiveRoomList";

import { QuestionTag } from "../../models";
import { getQuestionTagList } from "../../api/getQuestionTagList";

const LIVE_ROOMS_LIMIT = 2;

export const MentoringRoomsPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [tagList, setTagList] = useState<QuestionTag[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  const getLiveRoomListForINF = async ({ pageParam = 0 }) => {
    return await getLiveRoomList({
      filter: appliedTagOptions,
      page: pageParam,
      limit: LIVE_ROOMS_LIMIT,
    });
  };

  const { data, error, fetchNextPage, hasNextPage, status, refetch } =
    useInfiniteQuery(
      ["MentoringRooms_roomList", JSON.stringify(appliedTagOptions)],
      getLiveRoomListForINF,
      {
        getNextPageParam: (recentResponse, page) => {
          return recentResponse.nextPage === undefined
            ? false
            : recentResponse.nextPage;
        },
      }
    );

  const refetchByNewFilterOption = () => {
    refetch({
      refetchPage: () => true,
    });
  };

  const setInitialTagList = async () => {
    const { data } = await getQuestionTagList();
    setTagList(data);
  };

  useEffect(() => {
    setInitialTagList();
  }, []);
  useEffect(refetchByNewFilterOption, [appliedTagOptions]);

  return (
    <MentoringRoomsPageContainer>
      <FilterOptionHandler
        tagList={tagList}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
      />
      <hr />
      <RoomListGridContainer ref={containerRef}>
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
                  limit={LIVE_ROOMS_LIMIT}
                  nowPage={
                    group.nextPage === undefined ? 0 : group.nextPage - 1
                  }
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
