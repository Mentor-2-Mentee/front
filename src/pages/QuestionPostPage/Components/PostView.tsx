import { Box, Button, SxProps, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { QuestionView } from "../../../commonElements/QuestionView";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import { useDeleteQuestionPostMutation } from "../../../hooks/queries/questionPost/useDeleteQuestionPostMutation";
import { getCookieValue } from "../../../utils";
import DateFormatting from "../../../utils/dateFormatting";

interface PostViewProps {
  postId: number;
}

type PostButtonType = "PostRewrite" | "QuestionReWrite" | "Delete";

export const PostView = ({ postId }: PostViewProps) => {
  const { id } = useContext(RootContext);
  const questionPostQuery = useGetQuestionPostQuery({ postId });
  const postDescriptionRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedPostId = Number(searchParams.get("id"));
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const resizeViewImage = useCallback(() => {
    if (!postDescriptionRef.current) return;
    const imageTag = postDescriptionRef.current.querySelectorAll("img");
    for (const img of imageTag) {
      if (img.width < postDescriptionRef.current.clientWidth) return;
      img.style.width = "100%";
    }
  }, [postDescriptionRef.current]);

  const deleteQuestionPost = useDeleteQuestionPostMutation(
    enqueueSnackbar,
    navigation
  );

  useEffect(() => {
    resizeViewImage();
  }, [resizeViewImage]);

  if (questionPostQuery.status === "loading") return <div>Loading...</div>;
  if (questionPostQuery.status === "error") return <div>Error</div>;

  const { title, description, author, createdAt, viewCount, question } =
    questionPostQuery.data.questionPost;
  const reformedCreatedAt = new DateFormatting(new Date(createdAt));

  const handlePostHandleButton = (buttonType: PostButtonType) => () => {
    if (id !== author.id) return;
    switch (buttonType) {
      case "QuestionReWrite":
        navigation(
          `/question/rewrite?target=question&id=${question.id}&page=${nowPage}`
        );
        break;

      case "PostRewrite":
        navigation(
          `/question/rewrite?target=post&id=${selectedPostId}&page=${nowPage}`
        );
        break;

      case "Delete":
        const token = getCookieValue("accessToken");
        if (!token) {
          enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
          return;
        }
        const response = confirm(
          "삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다"
        );
        if (!response) return;
        deleteQuestionPost.mutate({
          token,
          questionPostId: postId,
        });

        break;

      default:
        break;
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          pb: 1,
          mb: 1,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
        }}
      >
        질문 게시판
      </Typography>

      <Box sx={{ pl: 1, pr: 1, pb: 1 }}>
        <PostTitle
          rootTag={question.rootTag}
          detailTag={question.detailTag}
          postTitle={title}
        />
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            {author.userName}
          </Typography>
          <Typography variant="subtitle1">
            {`${reformedCreatedAt.YYYY_MM_DD} / ${reformedCreatedAt.HH_MM_SS}`}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, display: "flex", justifyContent: "end" }}
          >
            {`조회수 ${viewCount}`}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: `0.5px solid ${SignatureColor.BLACK_80}`,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
          display: "flex",
          justifyContent: "center",
          flexFlow: "column",
        }}
      >
        <QuestionView question={question} />

        <Box
          ref={postDescriptionRef}
          sx={{
            "& img": {
              maxWidth: "100%",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mt: 1,
        }}
      >
        <Button
          variant="contained"
          disabled={id !== author.id}
          onClick={handlePostHandleButton("PostRewrite")}
          sx={{ mr: 1 }}
        >
          글 수정
        </Button>
        <Button
          variant="contained"
          disabled={id !== author.id}
          onClick={handlePostHandleButton("Delete")}
        >
          삭제
        </Button>
      </Box>
    </>
  );
};

interface PostTitleProps {
  rootTag?: string;
  detailTag: string[];
  postTitle: string;
}

const PostTitle = ({
  rootTag = "기타",
  detailTag,
  postTitle,
}: PostTitleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">[</Typography>
      {detailTag.length === 0 ? (
        <Typography variant="h6">{rootTag}</Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{ whiteSpace: "nowrap" }}
          >{`${rootTag}/ `}</Typography>
          <Typography
            variant="h6"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: 200,
            }}
          >{`${detailTag.join(", ")}`}</Typography>
        </>
      )}
      <Typography variant="h6" sx={{ mr: 1 }}>
        ]
      </Typography>
      <Typography
        variant="h6"
        sx={{
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          maxWidth: "calc(100% - 150px)",
        }}
      >
        {postTitle}
      </Typography>
    </Box>
  );
};

export default PostView;
