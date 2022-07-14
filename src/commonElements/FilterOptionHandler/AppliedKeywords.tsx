import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { FilterOptionButton } from "./FilterOptionButton";
import ClearIcon from "@mui/icons-material/Clear";
import { FilterOption } from ".";

interface AppliedKeywordsProps extends Pick<FilterOption, "filterKeywords"> {
  cancelFilterKeyword: (target: string) => void;
}
export const AppliedKeywords = ({
  filterKeywords,
  cancelFilterKeyword,
}: AppliedKeywordsProps): JSX.Element => {
  const deleteAppliedKeyword = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetKeyword = event.currentTarget.innerText;
    cancelFilterKeyword(targetKeyword);
  };

  return (
    <AppliedKeywordsContainer>
      {filterKeywords.map((keyword) => {
        return (
          <KeywordBox onClick={deleteAppliedKeyword}>
            <Typography variant="subtitle2" component="div" sx={{ mr: 0.5 }}>
              {keyword}
            </Typography>
            <ClearIcon fontSize="small" />
          </KeywordBox>
        );
      })}
    </AppliedKeywordsContainer>
  );
};

const AppliedKeywordsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",

  "& > *": {
    marginLeft: theme.spacing(1),
  },
}));

const KeywordBox = styled("div")(({ theme }) => ({
  height: theme.spacing(3),
  padding: theme.spacing(0.25, 2, 0.25, 2),
  borderRadius: theme.spacing(1.5),
  boxShadow: `0 0 0 1px ${SignatureColor.BLUE} inset`,

  display: "flex",
  alignItems: "center",

  "&:hover": {
    backgroundColor: SignatureColor.BLUE,
    color: "white",
  },
}));

export default AppliedKeywords;
