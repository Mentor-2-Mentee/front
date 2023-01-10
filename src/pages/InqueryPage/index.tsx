import {
  Box,
  Button,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { useGetInqueryListQuery } from "../../hooks/queries/inquery";
import { InqueryList } from "./Components/InqueryList";
import { InqueryView } from "./Components/InqueryView";
import InqueryWrite from "./Components/InqueryWrite";

const HEADER_TABS = ["번호", "제목", "작성자", "작성일"];
const POST_LIMIT = 10;

export const InqueryPage = () => {
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const navigation = useNavigate();
  const { mode } = useParams();
  const [searchParams, _] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedId = Number(searchParams.get("id"));

  const [page, setPage] = useState<number>(nowPage === 0 ? 1 : nowPage);

  const { data: inqueryList, status: getInqueryListQueryStatus } =
    useGetInqueryListQuery({
      page,
      limit: POST_LIMIT,
    });

  const handlePageChange = (
    _: React.ChangeEvent<unknown>,
    selectPage: number
  ) => {
    setPage(selectPage);
    if (mode === "view") {
      navigation(`/inquery/view?id=${selectedId}&page=${selectPage}`);
      return;
    }
    navigation(`/inquery/list?page=${selectPage}`);
  };

  const navigateTargetInquery = useCallback(
    (inqueryId: number) => {
      navigation(
        `/inquery/view?id=${inqueryId}&page=${nowPage === 0 ? 1 : nowPage}`
      );
    },
    [nowPage]
  );

  const handleBoardTitleClick = () => navigation(`/inquery/list`);
  const handleInqueryWriteButton = () => navigation(`/inquery/write`);

  if (getInqueryListQueryStatus === "loading") return <CircularProgress />;
  if (getInqueryListQueryStatus === "error") return <div>Error</div>;

  return (
    <Container sx={{ pt: 2 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          pb: 1,
          mb: 1,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleBoardTitleClick}
      >
        문의사항
      </Typography>

      <Box>
        {mode === "view" && selectedId !== null ? (
          <InqueryView inqueryId={selectedId} />
        ) : null}
      </Box>

      <Box>{mode === "write" ? <InqueryWrite /> : null}</Box>

      <Box sx={InqueryBoardBoxSxProps(isWidthShort, "HEADER")}>
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
        <InqueryList
          inqueryList={inqueryList}
          inqueryClickCallback={navigateTargetInquery}
        />
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

export const InqueryBoardBoxSxProps = (
  isWidthShort: boolean,
  type: "HEADER" | "ELEMENT",
  isSelected?: boolean
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

  backgroundColor: isSelected ? SignatureColor.GRAY_BORDER : "unset",

  "&:hover": {
    backgroundColor: type === "HEADER" ? "unset" : SignatureColor.GRAY,
    cursor: type === "HEADER" ? "unset" : "pointer",
  },
});

const BoardPaginationSxProps: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  pt: 2,
  mb: 20, // 공간생성
};

export default InqueryPage;
