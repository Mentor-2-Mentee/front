import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { InqueryView } from "./Components/InqueryView";
import InqueryWrite from "./Components/InqueryWrite";

const HEADER_TABS = ["번호", "제목", "작성자", "작성일"];
const POST_LIMIT = 10;

export const InqueryPage = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const navigation = useNavigate();
  const { mode } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedId = Number(searchParams.get("id"));
  const rewriteTarget = String(searchParams.get("target"));

  const [page, setPage] = useState<number>(nowPage === 0 ? 1 : nowPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    selectPage: number
  ) => {
    setPage(selectPage);
    if (mode === "view") {
      navigation(`/inquery/view?id=${selectedId}&page=${selectPage}`);
      return;
    }
    navigation(`/inquery/list?page=${selectPage}`);
  };

  const handleInqueryClick = (inqueryId: number) => () => {
    navigation(
      `/inquery/view?id=${inqueryId}&page=${nowPage === 0 ? 1 : nowPage}`
    );
  };

  const handleBoardTitleClick = () => navigation(`/inquery/list`);
  const handleInqueryWriteButton = () => navigation(`/inquery/write`);

  return (
    <Container sx={{ pt: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          pb: 1,
          mb: 1,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
        }}
        onClick={handleBoardTitleClick}
      >
        문의사항
      </Typography>

      <Box>
        {mode === "view" && selectedId !== null ? (
          <InqueryView inqueryId={1} />
        ) : null}
      </Box>

      <Box>{mode === "write" ? <InqueryWrite /> : null}</Box>

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
        <Box
          //   key={post.id}
          sx={QuestionBoardBoxSxProps(isWidthShort, "ELEMENT")}
          //   onClick={handlePostElementClick(post.id)}
          onClick={handleInqueryClick(1)}
        >
          {isWidthShort ? null : (
            <Typography
              variant={isWidthShort ? "subtitle2" : "subtitle1"}
              sx={{
                ...QuestionPostSxProps,
                gridArea: "id",
              }}
            >
              25
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              gridArea: "title",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "90%",
                fontWeight: "bold",
                mr: 1,
              }}
            >
              {"문의남깁니다."}
            </Typography>
            <Typography variant="subtitle2" fontWeight={"bold"}>
              {/* {post.postComment.length === 0
                    ? null
                    : `[${post.postComment.length}]`} */}
              {"[2]"}
            </Typography>
          </Box>
          <Typography
            variant={isWidthShort ? "subtitle2" : "subtitle1"}
            sx={{
              ...QuestionPostSxProps,
              gridArea: "author",
            }}
          >
            {/* {post.author.userName} */}
            미도리
          </Typography>
          <Typography
            variant={isWidthShort ? "subtitle2" : "subtitle1"}
            sx={{
              ...QuestionPostSxProps,
              gridArea: "time",
            }}
          >
            {/* {isPassed24HR
                  ? reformedCreatedDate.MM_DD
                  : reformedCreatedDate.HH_MM} */}
            10:24
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end", mt: 1 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleInqueryWriteButton}
        >
          작성하기
        </Button>
      </Box>

      <Box sx={BoardPaginationSxProps}>
        <Stack spacing={2}>
          <Pagination
            count={
              5
              //   isWidthShort
              //     ? Math.min(questionPostMaxPageQuery.data.maxPage, 5)
              //     : Math.min(questionPostMaxPageQuery.data.maxPage, 10)
            }
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Container>
  );
};

const QuestionBoardBoxSxProps = (
  isWidthShort: boolean,
  type: "HEADER" | "ELEMENT"
): SxProps => ({
  display: "grid",
  gridTemplateRows: isWidthShort ? "50% 40%" : "100%",
  gridTemplateColumns: isWidthShort
    ? "75px  calc(100% - 150px) 75px "
    : "75px  calc(100% - 275px) 100px 100px ",
  gridTemplateAreas: isWidthShort
    ? `" title title title "
       "author . time "`
    : `"id title author time"`,
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

const BoardPaginationSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pt: 2,
  mb: 20, // 공간생성
};

export default InqueryPage;
