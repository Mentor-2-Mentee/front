import { Fade } from "@mui/material";
import { keyframes, styled } from "@mui/system";
import { SignitureColor } from "../commonStyles/color";

interface CommentsCountBoxProps {
  commentsCount: number;
}

export const CommentsCountBox = ({
  commentsCount,
}: CommentsCountBoxProps): JSX.Element => {
  return (
    <CommentsCountBoxStyle>
      <div>{commentsCount}</div>
    </CommentsCountBoxStyle>
  );
};

const CommentsCountBoxStyle = styled("div")(({ theme }) => ({
  backgroundColor: SignitureColor.PH11,
  color: "#FFFFFF",
  borderRadius: 5,
  padding: theme.spacing(0.25, 1, 0.25, 1),
  fontWeight: "bold",
}));

export default CommentsCountBox;
