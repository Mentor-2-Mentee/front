import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router";
import { createTestSchedule } from "../../api/testSchedule/createTestSchedule";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import ApiFetchHandler from "../../utils/ApiFetchHandler";
import { getCookieValue } from "../../utils/handleCookieValue";
import TestDatePicker from "./TestDatePicker";
import TestFieldSelector from "./TestFieldSelector";

export const CreateTestSchedulePage = (): JSX.Element => {
  const [testScheduleTitle, setTestScheduleTitle] = useState<string>("");
  const [testUrl, setTestUrl] = useState<string>("");
  const [testDate, setTestDate] = useState<Date | null>(null);
  const [testField, setTestField] = useState<string>("");
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [testDescription, setTestDescription] = useState<string>();
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();

  const handleInputTestScheduleTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTestScheduleTitle(event.target.value);
  };

  const handleInputTestUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestUrl(event.target.value);
  };

  const handleInputTestDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => [setTestDescription(event.target.value)];

  const handleCancelButton = () => {
    navigation(-1);
  };

  const submitTestScheduleForm = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    if (testScheduleTitle === "") {
      enqueueSnackbar("시험명을 입력해 주세요.", { variant: "warning" });
      return;
    }

    try {
      const response = await createTestSchedule({
        token: accessToken,
        testScheduleTitle,
        testUrl,
        testDate,
        testField,
        imageFileList,
        testDescription,
      });
      console.log("response", response);

      enqueueSnackbar(`새 시험일정이 등록되었습니다. `, {
        variant: "success",
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("새 시험일정 등록에 실패했습니다.", { variant: "error" });
    }
  };

  const handleSubmitTestScheduleForm = new ApiFetchHandler<void>(
    submitTestScheduleForm,
    500
  );

  const debouncedSubmitTestScheduleForm = () => {
    handleSubmitTestScheduleForm.debounce();
  };
  return (
    <BackgroundBox>
      <CreateTestSchedulePageContainer>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          시험일정 등록
        </Typography>
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="시험이름을 입력해 주세요"
          fullWidth
          value={testScheduleTitle}
          onChange={handleInputTestScheduleTitle}
          sx={{ mb: 2 }}
        />
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="공고 링크 (ex - https://www.q-net.or.kr)"
          fullWidth
          value={testUrl}
          onChange={handleInputTestUrl}
          sx={{ mb: 2 }}
        />
        <TestDatePicker useTastDateState={[testDate, setTestDate]} />
        <TestFieldSelector useTestFieldState={[testField, setTestField]} />
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="시험에 대한 설명을 간략히 적어주세요"
          rows={4}
          multiline
          fullWidth
          sx={{ mb: 2 }}
          value={testDescription}
          onChange={handleInputTestDescription}
        />
        <ImageUpload
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
        <ButtonContainer>
          <Button
            variant="contained"
            sx={{
              background: SignatureColor.GRAY,
              color: SignatureColor.BLACK,
              "&:hover": {
                background: SignatureColor.RED,
                color: SignatureColor.WHITE,
              },
            }}
            onClick={handleCancelButton}
          >
            취소
          </Button>
          <Button variant="contained" onClick={debouncedSubmitTestScheduleForm}>
            등록하기
          </Button>
        </ButtonContainer>
      </CreateTestSchedulePageContainer>
    </BackgroundBox>
  );
};

const BackgroundBox = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  padding: theme.spacing(5, 15, 5, 15),
}));

const CreateTestSchedulePageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(5, 15, 5, 15),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),
}));

const SetTestFieldContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  justifyContent: "end",
  marginTop: theme.spacing(2),

  "& > button": {
    marginLeft: theme.spacing(2),
  },
}));

export default CreateTestSchedulePage;
