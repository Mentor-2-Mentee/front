import { Box, SxProps, Typography } from "@mui/material";
import { SignatureColor } from "../../../commonStyles/CommonColor";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";

interface PostViewProps {
  postId: number;
}
export const PostView = ({ postId }: PostViewProps) => {
  const questionPostQuery = useGetQuestionPostQuery({ postId });

  if (questionPostQuery.status === "loading") return <div>Loading...</div>;
  if (questionPostQuery.status === "error") return <div>Error</div>;

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
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ mr: 1 }}>
            {questionPostQuery.data.questionPost.question.detailTag.length === 0
              ? `[${
                  questionPostQuery.data.questionPost.question.rootTag || "기타"
                }]`
              : `[${
                  questionPostQuery.data.questionPost.question.rootTag
                } > ${questionPostQuery.data.questionPost.question.detailTag.join(
                  ", "
                )}]`}
          </Typography>
          <Typography variant="h6">
            {questionPostQuery.data.questionPost.questionPostTitle}
          </Typography>
        </Box>
        <Typography variant="subtitle1">
          {questionPostQuery.data.questionPost.author}
        </Typography>
        <Typography variant="subtitle1">
          {questionPostQuery.data.questionPost.createdAt}
        </Typography>
      </Box>
      <Box
        sx={{
          borderTop: `0.5px solid ${SignatureColor.BLACK_80}`,
          borderBottom: `2px solid ${SignatureColor.BLACK_80}`,
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: questionPostQuery.data.questionPost.questionPostDescription,
          }}
        />
      </Box>
    </>
  );
};

const PostHeaderSxProps: SxProps = {};

export default PostView;
