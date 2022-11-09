import { useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";

import { SignatureColor } from "../commonStyles/CommonColor";
import MarkupEditer from "./MarkupEditer";

interface QuestionEditerProps {
  useTextState: [string, React.Dispatch<React.SetStateAction<string>>];
  headText?: string;
}

export const QuestionEditer = ({
  useTextState,
  headText = "문제 내용",
}: QuestionEditerProps) => {
  const [text, setText] = useTextState;
  const [isEditerOpen, setIsEditerOpen] = useState<boolean>(true);

  const handleEditerButton = () => {
    setIsEditerOpen(!isEditerOpen);
  };

  return (
    <Box sx={QuestionBoxSxProps(isEditerOpen)}>
      <Box sx={QuestionHeaderBoxSxProps}>
        <Typography variant="subtitle1" fontWeight="bold">
          {headText}
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{
            fontWeight: "bold",
            color: SignatureColor.BLUE,
          }}
          onClick={handleEditerButton}
        >
          {isEditerOpen ? "접기" : "열기"}
        </Button>
      </Box>
      {isEditerOpen ? <MarkupEditer usePostState={[text, setText]} /> : null}
    </Box>
  );
};

const QuestionBoxSxProps = (isEditerOpen: boolean): SxProps => ({
  p: 2,

  display: "flex",
  flexFlow: "column",

  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
});

const QuestionHeaderBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
  mb: 1,
};
