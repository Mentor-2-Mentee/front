import { useEffect, useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/system";

import { SignatureColor } from "../commonStyles/CommonColor";
import MarkupEditer from "./MarkupEditer";

interface QuestionEditerProps {
  useTextState: [string, React.Dispatch<React.SetStateAction<string>>];
  headText?: string;
  width?: number | string;
  height?: number | string;
  minHeight?: number | string;
}

export const QuestionEditer = ({
  useTextState,
  headText = "문제 내용",
  width,
  height = "100%",
  minHeight = 300,
}: QuestionEditerProps) => {
  const [text, setText] = useTextState;
  const [isEditerOpen, setIsEditerOpen] = useState<boolean>(true);

  const handleEditerButton = () => {
    setIsEditerOpen(!isEditerOpen);
  };

  return (
    <Box sx={QuestionBoxSxProps(isEditerOpen, height)}>
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

const QuestionBoxSxProps = (
  isEditerOpen: boolean,
  height?: number | string,
  minHeight?: number | string
): SxProps => ({
  border: `2px solid ${SignatureColor.GRAY_BORDER}`,
  borderRadius: 3,
  display: "flex",
  flexFlow: "column",
  width: "calc(100% - 36px)",
  minWidth: 300,
  height: isEditerOpen ? height : "unset",
  minHeight,
  maxHeight: 500,
  margin: "10px auto 10px",
  p: 2,
});

const QuestionHeaderBoxSxProps: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${SignatureColor.BLACK_80}`,
  mb: 1,
};
