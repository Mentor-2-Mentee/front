import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PostView from "../../../commonElements/PostView";
import { useGetInqueryQuery } from "../../../hooks/queries/inquery/useGetInqueryQuery";
import { getCookieValue } from "../../../utils";
import InqueryWrite from "./InqueryWrite";

interface InqueryViewProps {
  inqueryId: number;
}

export const InqueryView = ({ inqueryId }: InqueryViewProps) => {
  const navigation = useNavigate();
  const [isRewrite, setIsRewrite] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>("");
  const {
    data: inqueryData,
    status: getInqueryQueryStatus,
    refetch: revalidatePassword,
  } = useGetInqueryQuery({
    token: getCookieValue("accessToken"),
    inqueryId,
    password: inputPassword,
  });

  const handleInputPassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(event.target.value);

  const handlePasswordSubmit = () => revalidatePassword();
  const handleRewriteButton = () => setIsRewrite(true);

  if (getInqueryQueryStatus === "loading") return <CircularProgress />;
  if (getInqueryQueryStatus === "error")
    return (
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            비밀글 입니다
          </Typography>
          <TextField
            variant="outlined"
            name="title"
            size="small"
            helperText="작성시 등록한 비밀번호를 입력하세요"
            label="비밀번호"
            type={"password"}
            value={inputPassword}
            onChange={handleInputPassword}
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handlePasswordSubmit}>
            입력
          </Button>
        </Box>
      </Box>
    );

  if (isRewrite)
    return (
      <Box>
        <InqueryWrite isRewrite={isRewrite} rewriteInquery={inqueryData} />
      </Box>
    );

  return (
    <>
      <PostView
        postViewData={{
          postId: inqueryData.id,
          title: inqueryData.title,
          description: inqueryData.description,
          author:
            inqueryData.author !== undefined && inqueryData.author !== null
              ? inqueryData.author.userName
              : inqueryData.instantName || "문의자",
          createdAt: inqueryData.createdAt,
        }}
      />

      <Box sx={HandleButtonBoxSxProps}>
        <Button
          variant="contained"
          onClick={handleRewriteButton}
          sx={{ mr: 1 }}
        >
          글 수정
        </Button>
        <Button
          variant="contained"
          // disabled={id !== author.id}
          // onClick={handlePostHandleButton("Delete")}
        >
          삭제
        </Button>
      </Box>
    </>
  );
};

const HandleButtonBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "end",
  mt: 1,
  mb: 1,
};
