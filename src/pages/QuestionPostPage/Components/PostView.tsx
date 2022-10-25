import {
  Box,
  Button,
  IconButton,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { QuestionView } from "../../../commonElements/QuestionView";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import { useDeleteQuestionPostCommentMutation } from "../../../hooks/queries/questionPost/useDeleteQuestionPostCommentMutation";
import { useDeleteQuestionPostMutation } from "../../../hooks/queries/questionPost/useDeleteQuestionPostMutation";
import { useGetQuestionPostCommentQuery } from "../../../hooks/queries/questionPost/useGetQuestionPostCommentQuery";
import { usePostQuestionPostCommentMutation } from "../../../hooks/queries/questionPost/usePostQuestionPostCommentMutation";
import { getCookieValue } from "../../../utils";
import DateFormatting from "../../../utils/dateFormatting";
import DeleteIcon from "@mui/icons-material/Delete";

interface PostViewProps {
  postId: number;
}

type PostButtonType = "PostRewrite" | "QuestionReWrite" | "Delete";

export const PostView = ({ postId }: PostViewProps) => {
  const { id, userName } = useContext(RootContext);
  const questionPostQuery = useGetQuestionPostQuery({ postId });
  const postDescriptionRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const nowPage = Number(searchParams.get("page"));
  const selectedPostId = Number(searchParams.get("id"));
  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [inputComment, setInputComment] = useState<string>("");
  const [holdShift, setHoldShift] = useState<boolean>(false);
  const [disableEnterSubmit, setDisableEnterSubmit] = useState<boolean>(false);

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

  const postQuestionPostComment = usePostQuestionPostCommentMutation(
    selectedPostId,
    setInputComment
  );

  const questionPostComment = useGetQuestionPostCommentQuery({
    questionPostId: selectedPostId,
  });

  const deleteQuestionPostComment = useDeleteQuestionPostCommentMutation(
    selectedPostId,
    enqueueSnackbar
  );

  useEffect(() => {
    resizeViewImage();
  }, [resizeViewImage]);

  const submitComment = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token || !userName || !id) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    if (inputComment.trim().length === 0) {
      enqueueSnackbar("내용을 입력해주세요", { variant: "warning" });
      return;
    }
    postQuestionPostComment.mutate({
      token,
      commentForm: {
        author: userName,
        authorId: id,
        commentLevel: 0,
        postId: selectedPostId,
        comment: inputComment,
      },
    });
  }, [userName, id, inputComment, postQuestionPostComment]);

  if (
    questionPostQuery.status === "loading" ||
    questionPostComment.status === "loading"
  )
    return <div>Loading...</div>;
  if (
    questionPostQuery.status === "error" ||
    questionPostComment.status === "error"
  )
    return <div>Error</div>;

  const { title, description, author, createdAt, viewCount, question } =
    questionPostQuery.data.questionPost;
  const reformedCreatedAt = new DateFormatting(new Date(createdAt));

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift" && holdShift) {
      setHoldShift(false);
      return;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Shift") {
      setHoldShift(true);
      return;
    }
    if (
      event.key === "Enter" &&
      !holdShift &&
      !event.nativeEvent.isComposing &&
      !disableEnterSubmit
    ) {
      submitComment();
      return;
    }
  };

  const handleCommentSubmitButton = () => {
    submitComment();
  };

  const handleCommentDeleteButton = (commentId: number) => () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해주세요", { variant: "warning" });
      return;
    }
    deleteQuestionPostComment.mutate({
      token,
      commentId,
    });
  };

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

      <Box sx={{ p: 1 }}>
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
          mb: 1,
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

      <Box sx={CommentListBoxSxProps}>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          {`댓글 ${questionPostComment.data.commentList.length}`}
        </Typography>
        {questionPostComment.data.commentList.map((commentElement) => {
          const reformedCreatedAt = new DateFormatting(
            new Date(commentElement.createdAt)
          );
          return (
            <Box sx={CommentElementBoxSxProps}>
              <IconButton
                className="deleteIcon"
                size="small"
                sx={{
                  position: "absolute",
                  right: 0,
                  visibility:
                    id === commentElement.authorId ? "visible" : "hidden",
                }}
                onClick={handleCommentDeleteButton(commentElement.id)}
              >
                <DeleteIcon />
              </IconButton>
              <Typography variant="subtitle1" fontWeight={"bold"}>
                {commentElement.author}
              </Typography>
              <Typography variant="body1" whiteSpace={"pre"}>
                {commentElement.comment}
              </Typography>
              <Typography variant="body2" maxWidth={"70%"}>
                {`${reformedCreatedAt.YYYY_MM_DD} ${reformedCreatedAt.HH_MM_SS}`}
              </Typography>
            </Box>
          );
        })}
        <Box sx={CommentInputBoxSxProps}>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            {userName}
          </Typography>
          <TextField
            multiline
            rows={3}
            size="small"
            variant="outlined"
            fullWidth
            value={inputComment}
            onTouchStart={() => {
              setDisableEnterSubmit(true);
            }}
            onChange={handleCommentInput}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 1 }}>
          <Button variant="contained" onClick={handleCommentSubmitButton}>
            작성하기
          </Button>
        </Box>
      </Box>
    </>
  );
};

const CommentListBoxSxProps: SxProps = {
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
  p: 2,
};

const CommentElementBoxSxProps: SxProps = {
  borderBottom: `2px solid ${SignatureColor.BLACK_30}`,
  m: 1,
  width: "100%",
  position: "relative",
};

const CommentInputBoxSxProps: SxProps = {
  m: 1,
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
        flexWrap: "wrap",
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
          maxWidth: "100%",
        }}
      >
        {postTitle}
      </Typography>
    </Box>
  );
};

export default PostView;
