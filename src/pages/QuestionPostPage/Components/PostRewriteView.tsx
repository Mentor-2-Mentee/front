import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import PostEditer from "../../../commonElements/PostEditer";

interface PostRewriteViewProps {
  postId: number;
}
export const PostRewriteView = ({ postId }: PostRewriteViewProps) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [post, setPost] = useState<string>("");

  const questionPostQuery = useGetQuestionPostQuery({ postId });

  useEffect(() => {
    if (questionPostQuery.status !== "success") return;
    const { questionPostTitle, questionPostDescription, author } =
      questionPostQuery.data.questionPost;
    setPostTitle(questionPostTitle);
    setPost(questionPostDescription);
  }, [questionPostQuery.status, questionPostQuery.data]);

  const handleInputPostTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPostTitle(event.target.value);

  return (
    <Box sx={{ mb: 2, "& > *": { mb: 1 } }}>
      <Typography variant="subtitle1">게시글 제목</Typography>
      <TextField
        variant="outlined"
        name="title"
        size="small"
        placeholder="제목을 입력해 주세요"
        fullWidth
        value={postTitle}
        onChange={handleInputPostTitle}
      />
      <Typography variant="subtitle1">상세 질의 내용</Typography>
      <PostEditer usePostState={[post, setPost]} />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" sx={{ mr: 1 }}>
          취소
        </Button>
        <Button variant="contained">등록</Button>
      </Box>
    </Box>
  );
};

export default PostRewriteView;
