import {
  Box,
  Container,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import NewQuestionButton from "../../commonElements/NewQuestionButton";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import { SignatureColor } from "../../commonStyles/CommonColor";
import {
  MentoringRoom,
  useGetMentoringRoomQueryListINF,
} from "../../hooks/queries/mentoringRoom";
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../hooks/queries/questionTag";
import { CommonSpace } from "../../commonStyles/CommonSpace";
import axiosInstance from "../../api/axiosInstance";
import {
  QuestionPost,
  useGetQuestionPostQuery,
} from "../../hooks/queries/questionPost";

const HEADER_TABS = ["번호", "분야", "제목", "작성자", "작성시간", "조회수"];

export const QuestionPostPage = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [tagList, setTagList] = useState<QuestionTag[]>([]);
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });

  const questionTagQuery = useGetQuestionTagQuery();
  const mentoringRoomQueryINF = useGetMentoringRoomQueryListINF({
    filter: appliedTagOptions,
    page: 0,
    limit: 10,
  });
  const [questionPost, setQuestionPost] = useState<QuestionPost[]>([]);

  const questionPostQuery = useGetQuestionPostQuery();

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  useEffect(() => {
    console.log(questionPostQuery.data);
    if (questionPostQuery.status !== "success") return;
    setQuestionPost(questionPostQuery.data.questionPost);
  }, [questionPostQuery.status, questionPostQuery.data]);

  // useEffect(() => {
  //   if (mentoringRoomQueryINF.status !== "success") return;
  //   const fetchedRoomList: MentoringRoom[] = [];
  //   console.log(mentoringRoomQueryINF.data);
  //   mentoringRoomQueryINF.data.pages.map((page) => {
  //     fetchedRoomList.push(...page.mentoringRoomList);
  //   }),
  //     setMentoringRoomList(fetchedRoomList);
  // }, [mentoringRoomQueryINF.status, mentoringRoomQueryINF.data]);

  if (questionPostQuery.status === "loading") return <div>Loading...</div>;
  if (questionPostQuery.status === "error") return <div>Error</div>;

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <FilterOptionHandler
        tagList={tagList}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
        tagLineSeparate
      />

      <Box sx={QuestionBoardBoxSxProps}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "50px 50px calc(100% - 350px) 100px 100px 50px",
            borderTop: `1px solid ${SignatureColor.BLACK_50}`,
            borderBottom: `2px solid ${SignatureColor.BLACK_50}`,
          }}
        >
          {HEADER_TABS.map((tabTitle) => {
            return (
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {tabTitle}
              </Typography>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "50px 50px calc(100% - 350px) 100px 100px 50px",
            borderTop: `1px solid ${SignatureColor.BLACK_50}`,
            borderBottom: `1px solid ${SignatureColor.BLACK_50}`,
          }}
        >
          {questionPostQuery.data.questionPost.map((post) => {
            return (
              <>
                <div>{post.questionPostId}</div>
                <div>{post.question.rootTag || "기타"}</div>
                <div>{post.questionPostTitle}</div>
                <div>{post.author}</div>
                <div>{post.createdAt}</div>
                <div>{post.viewCount}</div>
              </>
            );
          })}
        </Box>
      </Box>
      <NewQuestionButton />
    </Container>
  );
};

const PageContainerSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    padding: isWidthShort ? theme.spacing(2) : theme.spacing(2, 4, 4, 4),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
  });

const QuestionBoardBoxSxProps: SxProps = () => ({
  display: "flex",
  flexFlow: "column",
});

export default QuestionPostPage;
