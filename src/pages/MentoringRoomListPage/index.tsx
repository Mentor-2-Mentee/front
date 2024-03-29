import { useEffect, useRef, useState } from "react";
import { Box, Container, SxProps, Theme, useMediaQuery } from "@mui/material";
import NewQuestionButton from "../../commonElements/NewQuestionButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import InfinityScroll from "../../commonElements/InfinityScroll";
import { RoomElement } from "../../commonElements/RoomList";

import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../hooks/queries/questionTag";
import {
  MentoringRoom,
  useGetMentoringRoomQueryListINF,
} from "../../hooks/queries/mentoringRoom";

const LIVE_ROOMS_LIMIT = 4;

export const MentoringRoomListPage = (): JSX.Element => {
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const isWidthShort = useMediaQuery("(max-width:900px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const questionTagQuery = useGetQuestionTagQuery();
  const mentoringRoomQueryINF = useGetMentoringRoomQueryListINF({
    filter: appliedTagOptions,
    page: 0,
    limit: LIVE_ROOMS_LIMIT,
  });

  const [tagList, setTagList] = useState<QuestionTag[]>([]);
  const [mentoringRoomList, setMentoringRoomList] = useState<MentoringRoom[]>(
    []
  );

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  useEffect(() => {
    if (mentoringRoomQueryINF.status !== "success") return;
    const fetchedRoomList: MentoringRoom[] = [];
    mentoringRoomQueryINF.data.pages.map((page) => {
      fetchedRoomList.push(...page.mentoringRoomList);
    }),
      setMentoringRoomList(fetchedRoomList);
  }, [mentoringRoomQueryINF.status, mentoringRoomQueryINF.data]);

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <FilterOptionHandler
        tagList={tagList}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
        tagLineSeparate
      />
      <hr />
      <Box ref={containerRef} sx={MentoringRoomListBoxSxProps}>
        <InfinityScroll
          targetContainer={containerRef}
          listElements={mentoringRoomList}
          fetchCallback={mentoringRoomQueryINF.fetchNextPage}
          renderElement={(elementProps, index) => {
            return (
              <RoomElement
                key={elementProps.id + index}
                roomValue={elementProps}
                isLive={true}
              />
            );
          }}
        />
      </Box>
      <NewQuestionButton />
    </Container>
  );
};

const PageContainerSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    padding: isWidthShort
      ? theme.spacing(2, 2, 2, 2)
      : theme.spacing(2, 4, 4, 4),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
  });

const MentoringRoomListBoxSxProps: SxProps = {
  display: "flex",
  flexFlow: "wrap",
  marginRight: 4,
};

export default MentoringRoomListPage;
