import {
  Box,
  Container,
  Link,
  Pagination,
  Stack,
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
import { useGetMentoringRoomQueryListINF } from "../../hooks/queries/mentoringRoom";
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../hooks/queries/questionTag";
import {
  QuestionPost,
  useGetQuestionPostMaxPageQuery,
  useGetQuestionPostQuery,
} from "../../hooks/queries/questionPost";
import { useNavigate, useSearchParams } from "react-router-dom";

const HEADER_TABS = ["번호", "분야", "제목", "작성자", "작성시간", "조회수"];

export const QuestionPostPage = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [tagList, setTagList] = useState<QuestionTag[]>([]);
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [questionPost, setQuestionPost] = useState<QuestionPost[]>([]);

  const nowTime = Date.now();
  const questionTagQuery = useGetQuestionTagQuery();
  const questionPostQuery = useGetQuestionPostQuery();
  const questionPostMaxPageQuery = useGetQuestionPostMaxPageQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = searchParams.get("page");
  const navigation = useNavigate();

  const [page, setPage] = useState<number>(
    nowPage === null ? 1 : Number(nowPage)
  );
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    selectPage: number
  ) => {
    setPage(selectPage);
    navigation(`/question/list?page=${selectPage}`);
  };

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  useEffect(() => {
    if (questionPostQuery.status !== "success") return;
    setQuestionPost(questionPostQuery.data.questionPost);
  }, [questionPostQuery.status, questionPostQuery.data]);

  if (
    questionPostQuery.status === "loading" ||
    questionPostMaxPageQuery.status === "loading"
  )
    return <div>Loading...</div>;
  if (
    questionPostQuery.status === "error" ||
    questionPostMaxPageQuery.status === "error"
  )
    return <div>Error</div>;

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <FilterOptionHandler
        tagList={tagList}
        useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
        tagLineSeparate
      />

      <Box sx={QuestionBoardBoxSxProps(isWidthShort, "HEADER")}>
        {isWidthShort
          ? null
          : HEADER_TABS.map((tabTitle) => {
              return (
                <Typography
                  variant={isWidthShort ? "subtitle2" : "subtitle1"}
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

      <Box>
        {questionPostQuery.data.questionPost.map((post) => {
          const createdDate = new Date(post.createdAt);
          const isPassed24HR = Boolean(
            (nowTime - createdDate.getTime()) / 1000 >= 3600 * 24
          );
          return (
            <Box sx={QuestionBoardBoxSxProps(isWidthShort, "ELEMENT")}>
              {isWidthShort ? null : (
                <Typography
                  variant={isWidthShort ? "subtitle2" : "subtitle1"}
                  sx={{
                    ...QuestionPostSxProps,
                    gridArea: "id",
                  }}
                >
                  {post.questionPostId}
                </Typography>
              )}
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "tag",
                }}
              >
                {post.question.rootTag || "기타"}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  ...QuestionPostTitleSxProps,
                  gridArea: "title",
                }}
              >
                {post.questionPostTitle}
              </Typography>
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "author",
                }}
              >
                {post.author}
              </Typography>
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "time",
                }}
              >
                {isPassed24HR
                  ? `${createdDate.getMonth() + 1}.${createdDate.getDate()}`
                  : `${createdDate.getHours()}:${createdDate.getMinutes()}`}
              </Typography>
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "viewCount",
                }}
              >
                {isWidthShort ? `조회수 ${post.viewCount}` : post.viewCount}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={QuestionBoardPaginationSxProps}>
        <Stack spacing={2}>
          <Pagination
            count={
              isWidthShort
                ? Math.min(questionPostMaxPageQuery.data.maxPage, 5)
                : Math.min(questionPostMaxPageQuery.data.maxPage, 10)
            }
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
      <NewQuestionButton />
    </Container>
  );
};

const PageContainerSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    pt: 2,
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
  });

const QuestionBoardBoxSxProps = (
  isWidthShort: boolean,
  type: "HEADER" | "ELEMENT"
): SxProps => ({
  display: "grid",
  gridTemplateRows: isWidthShort ? "50% 40%" : "100%",
  gridTemplateColumns: isWidthShort
    ? "75px 50px calc(100% - 225px) 50px 50px"
    : "50px 75px calc(100% - 375px) 100px 100px 50px",
  gridTemplateAreas: isWidthShort
    ? `" title title title title title"
     "author viewCount . tag time "`
    : `"id tag title author time viewCount"`,
  borderTop:
    type === "HEADER" ? `1px solid ${SignatureColor.BLACK_50}` : "unset",
  borderBottom:
    type === "HEADER"
      ? `2px solid ${SignatureColor.BLACK_50}`
      : `1px solid ${SignatureColor.BLACK_50}`,

  "&:hover": {
    backgroundColor: type === "HEADER" ? "unset" : SignatureColor.GRAY,
  },
});

const QuestionPostSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
};

const QuestionBoardPaginationSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pt: 2,
};

const QuestionPostTitleSxProps: SxProps = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "100%",
  ml: 2,
  fontWeight: "bold",

  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default QuestionPostPage;
