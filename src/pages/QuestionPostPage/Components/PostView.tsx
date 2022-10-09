import { Box, SxProps, Typography } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import DateFormatting from "../../../utils/dateFormatting";

interface PostViewProps {
  postId: number;
}
export const PostView = ({ postId }: PostViewProps) => {
  const questionPostQuery = useGetQuestionPostQuery({ postId });
  const postDescriptionRef = useRef<HTMLDivElement>(null);

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

      <PostTitle
        rootTag={question.rootTag}
        detailTag={question.detailTag}
        postTitle={questionPostTitle}
      />
      <Box sx={{ display: "flex" }}>
        {/* <Typography variant="subtitle1" sx={{ mr: 2 }}>
          {author}
        </Typography> */}
        <Typography variant="subtitle1">
          {`${reformedCreatedAt.YYYY_MM_DD} / ${reformedCreatedAt.HH_MM_SS}`}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ flex: 1, pr: 4, display: "flex", justifyContent: "end" }}
        >
          {`조회수 ${viewCount}`}
        </Typography>
      </Box>

      <Box
        sx={{
          borderTop: `0.5px solid ${SignatureColor.BLACK_80}`,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
        }}
      >
        <Box>
          {question.questionText === undefined ? null : (
            <>
              <Typography>문제 본문</Typography>
              <Typography>{question.questionText}</Typography>
            </>
          )}

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
