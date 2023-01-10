import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetQuestionPostQuery } from "../../../hooks/queries/questionPost";
import { useNavigate } from "react-router-dom";
import { useUpdateQuestionPostMutation } from "../../../hooks/queries/questionPost/useUpdateQuestionPostMutation";
import { useSnackbar } from "notistack";
import { getCookieValue } from "../../../utils";
import MarkupEditer from "../../../commonElements/MarkupEditer";

interface PostModifyViewProps {
  postId: number;
}
export const PostModify = ({ postId }: PostModifyViewProps) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postDescription, setPostDescription] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();

  const navigation = useNavigate();
  const { data: questionPostData, status: getQuestionPostQueryStatus } =
    useGetQuestionPostQuery({ postId });
  const questionPostMutation = useUpdateQuestionPostMutation(
    enqueueSnackbar,
    navigation
  );

  useEffect(() => {
    if (getQuestionPostQueryStatus !== "success") return;
    const { title, description } = questionPostData;
    setPostTitle(title);
    setPostDescription(description);
  }, [getQuestionPostQueryStatus, questionPostData]);

  const handleInputPostTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPostTitle(event.target.value);

  const handleCancelButton = () => {
    navigation(-1);
  };

  const handleApplyButton = () => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    questionPostMutation.mutate({
      token,
      postForm: {
        id: postId,
        title: postTitle,
        description: postDescription,
      },
    });
  };

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
      <MarkupEditer usePostState={[postDescription, setPostDescription]} />
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleCancelButton}>
          취소
        </Button>
        <Button variant="contained" onClick={handleApplyButton}>
          등록
        </Button>
      </Box>
    </Box>
  );
};

export default PostModify;
