import { Box, Button, SxProps, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { RootContext } from "../../../hooks/context/RootContext";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
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

  const resizeViewImage = useCallback(() => {
    if (!postDescriptionRef.current) return;
    const imageTag = postDescriptionRef.current.querySelectorAll("img");
    for (const img of imageTag) {
      if (img.width < postDescriptionRef.current.clientWidth) return;
      img.style.width = "100%";
    }
  }, [postDescriptionRef.current]);

  useEffect(() => {
    resizeViewImage();
  }, [resizeViewImage]);

  if (questionPostQuery.status === "loading") return <div>Loading...</div>;
  if (questionPostQuery.status === "error") return <div>Error</div>;

  const {
    questionPostTitle,
    questionPostDescription,
    author,
    createdAt,
    viewCount,
    question,
  } = questionPostQuery.data.questionPost;
  const reformedCreatedAt = new DateFormatting(new Date(createdAt));

  const handlePostHandleButton = (buttonType: PostButtonType) => () => {
    if (id !== author.id) return;
    switch (buttonType) {
      case "QuestionReWrite":
        navigation(
          `/question/rewrite?target=question&id=${question.questionId}&page=${nowPage}`
        );
        break;

      case "PostRewrite":
        navigation(
          `/question/rewrite?target=post&id=${selectedPostId}&page=${nowPage}`
        );
        break;

      case "Delete":
        alert("삭제하시겠습니까?");
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
          postTitle={questionPostTitle}
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
        <Box
          sx={{
            border: `2px solid ${SignatureColor.GRAY_BORDER}`,
            borderRadius: 3,
            display: "flex",
            flexFlow: "column",
            minWidth: 320,
            margin: "10px auto 10px",
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "bold",
              }}
            >
              문제 내용
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "bold",
                color: SignatureColor.BLUE,
              }}
            >
              {question.questionType}
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
              minHeight: 100,
            }}
          >
            {question.questionText === undefined ? null : (
              <Typography>{question.questionText}</Typography>
            )}
            <Box>
              {question.questionImageUrl.map((url, index) => {
                return (
                  <img
                    key={`${question.questionId}_${index}`}
                    src={url}
                    alt={url}
                  />
                );
              })}
            </Box>
          </Box>
          <Box>
            {question.answerExample.map((answer, index) => {
              return (
                <Typography key={`${answer}_${index}`}>{answer}</Typography>
              );
            })}
          </Box>
        </Box>

        <Box
          ref={postDescriptionRef}
          sx={{
            "& img": {
              maxWidth: "100%",
            },
          }}
          dangerouslySetInnerHTML={{
            __html: questionPostDescription,
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
