import {
  Box,
  Container,
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
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../hooks/queries/questionTag";
import {
  QuestionPost,
  useGetQuestionPostMaxPageQuery,
  useGetQuestionPostListQuery,
  useGetQuestionPostQuery,
} from "../../hooks/queries/questionPost";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useParams } from "react-router";
import { PostRewriteView } from "./Components";
import DateFormatting from "../../utils/dateFormatting";
import QuestionPostView from "./Components/QuestionPostView";

const HEADER_TABS = ["번호", "분야", "제목", "작성자", "작성일", "조회수"];
const POST_LIMIT = 10;

export const QuestionPostPage = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const [tagList, setTagList] = useState<QuestionTag[]>([]);
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [questionPost, setQuestionPost] = useState<QuestionPost[]>([]);

  const { mode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedId = Number(searchParams.get("id"));
  const rewriteTarget = String(searchParams.get("target"));
  const navigation = useNavigate();

  const [page, setPage] = useState<number>(nowPage === 0 ? 1 : nowPage);
  const nowTime = Date.now();

  const questionTagQuery = useGetQuestionTagQuery();
  const questionPostListQuery = useGetQuestionPostListQuery({
    filter: appliedTagOptions,
    page,
    limit: POST_LIMIT,
  });
  const questionPostMaxPageQuery = useGetQuestionPostMaxPageQuery({
    limit: POST_LIMIT,
  });

  const questionPostQuery = useGetQuestionPostQuery({ postId: selectedId });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    selectPage: number
  ) => {
    setPage(selectPage);
    if (mode === "view") {
      navigation(`/question/view?id=${selectedId}&page=${selectPage}`);
      return;
    }
    navigation(`/question/list?page=${selectPage}`);
  };

  const handlePostElementClick = (postId: number) => () => {
    navigation(
      `/question/view?id=${postId}&page=${nowPage === 0 ? 1 : nowPage}`
    );
  };

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  useEffect(() => {
    if (questionPostListQuery.status !== "success") return;
    setQuestionPost(questionPostListQuery.data.questionPost);
  }, [questionPostListQuery.status, questionPostListQuery.data]);

  useEffect(() => {
    if (questionPostListQuery.status !== "success") return;
    setQuestionPost(questionPostListQuery.data.questionPost);
  }, [questionPostListQuery.status, questionPostListQuery.data]);

  if (questionPostMaxPageQuery.status === "loading")
    return <div>Loading...</div>;
  if (questionPostMaxPageQuery.status === "error") return <div>Error</div>;

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box>
        {mode === "view" && selectedId !== null && questionPostQuery.data ? (
          <QuestionPostView postId={selectedId} />
        ) : null}
      </Box>

      <Box>
        {mode === "rewrite" &&
        rewriteTarget === "post" &&
        selectedId !== null ? (
          <PostRewriteView postId={selectedId} />
        ) : null}
      </Box>

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
                  key={tabTitle}
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
        {questionPost.map((post) => {
          const createdDate = new Date(post.createdAt);
          const reformedCreatedDate = new DateFormatting(
            new Date(post.createdAt)
          );
          const isPassed24HR = Boolean(
            (nowTime - createdDate.getTime()) / 1000 >= 3600 * 24
          );
          return (
            <Box
              key={post.id}
              sx={QuestionBoardBoxSxProps(isWidthShort, "ELEMENT")}
              onClick={handlePostElementClick(post.id)}
            >
              {isWidthShort ? null : (
                <Typography
                  variant={isWidthShort ? "subtitle2" : "subtitle1"}
                  sx={{
                    ...QuestionPostSxProps,
                    gridArea: "id",
                  }}
                >
                  {post.id}
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
                {post.title}
              </Typography>
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "author",
                }}
              >
                {post.author.userName}
              </Typography>
              <Typography
                variant={isWidthShort ? "subtitle2" : "subtitle1"}
                sx={{
                  ...QuestionPostSxProps,
                  gridArea: "time",
                }}
              >
                {isPassed24HR
                  ? reformedCreatedDate.MM_DD
                  : reformedCreatedDate.HH_MM}
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

      {mode === "rewrite" ? null : <NewQuestionButton />}
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
    ? "70px 100px calc(100% - 320px) 75px 75px"
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
    cursor: "pointer",
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
  mb: 20, // 공간생성
};

const QuestionPostTitleSxProps: SxProps = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "100%",
  ml: 2,
  fontWeight: "600",

  "&:hover": {
    textDecoration: "underline",
  },
};

export default QuestionPostPage;
