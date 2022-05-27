import { styled } from "@mui/system";

export const AppliedFilterOptions = (): JSX.Element => {
  return (
    <AppliedFilterOptionsContainer>
      <div>미적용</div>
    </AppliedFilterOptionsContainer>
  );
};

const AppliedFilterOptionsContainer = styled("div")(({ theme }) => ({}));

export default AppliedFilterOptions;
