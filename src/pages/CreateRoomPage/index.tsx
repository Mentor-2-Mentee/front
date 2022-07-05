import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useState } from "react";
import FilterOptionHandler, {
  AppliedOptions,
} from "../../commonElements/FilterOptionHandler";

import DEV_DATA from "../MentoringRoomsPage/DEV_DATA.json";
import ImageUpload from "./ImageUpload";

export const CreateRoomPage = (): JSX.Element => {
  const [appliedFilterOptions, setAppliedFilterOptions] =
    useState<AppliedOptions>({
      parentElement: undefined,
      childElements: [],
      filterKeywords: [],
    });

  return (
    <CreateRoomPageContainer>
      <Typography variant="h5" sx={{ mb: 2 }}>
        질문등록
      </Typography>
      <TextField
        variant="outlined"
        name="title"
        size="small"
        placeholder="제목을 입력해 주세요"
        fullWidth
        sx={{ mb: 2 }}
      />
      <FilterOptionHandler
        filterElements={DEV_DATA.FILTER_OPTION_ELEMENTS}
        appliedOptions={appliedFilterOptions}
        setAppliedOptions={setAppliedFilterOptions}
        tagOnly
      />
      <TextField
        variant="outlined"
        name="title"
        size="small"
        placeholder="질문에 대한 설명을 간략히 적어주세요"
        rows={4}
        multiline
        fullWidth
        sx={{ mb: 2 }}
      />
      <ImageUpload />
      <Button variant="contained">취소</Button>
      <Button variant="contained">등록하기</Button>
    </CreateRoomPageContainer>
  );
};

const CreateRoomPageContainer = styled("div")(({ theme }) => ({
  margin: theme.spacing(10, 30, 10, 30),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

export default CreateRoomPage;
