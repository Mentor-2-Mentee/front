import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import CreateQuestionRoomButton from "../../commonElements/CreateQuestionRoomButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import InfinityScroll from "../../commonElements/InfinityScroll";
import { RoomElement } from "../../commonElements/RoomList";
import { getLiveRoomList } from "../../api/getLiveRoomList";

import { QuestionTag } from "../../models";
import { getQuestionTagList } from "../../api/getQuestionTagList";

const LIVE_ROOMS_LIMIT = 4;

export const MentoringRoomListPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [tagList, setTagList] = useState<QuestionTag[]>([]);
  const isWidthShort = useMediaQuery("(max-width:900px)");
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
    <Box
      sx={{
        margin: isWidthShort ? 2 : 4,
      }}
    >
      <FilterOptionHandler
        tagList={tagList}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
      />
      <hr />
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexFlow: "wrap",
          marginRight: 4,
        }}
      >
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
                        key={elementProps.mentoringRoomId + index}
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
      </Box>
      <CreateQuestionRoomButton />
    </Box>
  );
};

export default MentoringRoomListPage;
