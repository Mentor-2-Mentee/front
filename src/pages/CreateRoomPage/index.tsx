import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useState } from "react";
import FilterOptionHandler, {
  AppliedOptions,
} from "../../commonElements/FilterOptionHandler";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";
import DEV_DATA from "../MentoringRoomsPage/DEV_DATA.json";
import ImageUpload, { ImageFile } from "./ImageUpload";
import { getCookieValue } from "../../utils/handleCookieValue";
import ApiFetchHandler from "../../utils/ApiFetchHandler";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { createNewQuestionRoom } from "../../api/CreateNewQuestionRoom";

export const CreateRoomPage = (): JSX.Element => {
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [appliedTagOptions, setAppliedTagOptions] = useState<AppliedOptions>({
    parentElement: undefined,
    childElements: [],
    filterKeywords: [],
  });
  const [explainRoomText, setExplainRoomText] = useState<string | undefined>();
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();

  const handleInputRoomTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomTitle(event.target.value);
  };

  const handleInputExplainRoomText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExplainRoomText(event.target.value);
  };
  const handleCancelButton = () => {
    navigation(-1);
  };

  const injectPreventLeavePageEvent = useCallback(
    (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    },
    []
  );

  const createQuestionRoom = async () => {
    const accessToken = getCookieValue("accessToken");
    if (accessToken === undefined) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    if (roomTitle === "") {
      enqueueSnackbar("제목을 입력해 주세요.", { variant: "warning" });
      return;
    }

    try {
      const response = await createNewQuestionRoom({
        token: accessToken,
        roomTitle,
        appliedTagOptions: {
          parentElement: appliedTagOptions.parentElement,
          childElements: appliedTagOptions.childElements,
        },
        explainRoomText,
        imageFileList,
      });

      enqueueSnackbar(`새 질의응답방이 생성되었습니다. ${response.url}`, {
        variant: "success",
      });
    } catch (error) {}
  };

  const handleCreateQuestionRoom = new ApiFetchHandler<void>(
    createQuestionRoom,
    500
  );

  const debouncedCreateQuestionRoom = () => {
    handleCreateQuestionRoom.debounce();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", injectPreventLeavePageEvent);
    return () => {
      window.removeEventListener("beforeunload", injectPreventLeavePageEvent);
    };
  }, []);

  return (
    <BackgroundBox>
      <CreateRoomPageContainer>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          질문등록
        </Typography>
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="제목을 입력해 주세요"
          fullWidth
          sx={{ mb: 2 }}
          value={roomTitle}
          onChange={handleInputRoomTitle}
        />
        <FilterOptionHandler
          filterElements={DEV_DATA.FILTER_OPTION_ELEMENTS}
          appliedOptions={appliedTagOptions}
          setAppliedOptions={setAppliedTagOptions}
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
          value={explainRoomText}
          onChange={handleInputExplainRoomText}
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
          <Button variant="contained" onClick={debouncedCreateQuestionRoom}>
            등록하기
          </Button>
        </ButtonContainer>
      </CreateRoomPageContainer>
    </BackgroundBox>
  );
};

const BackgroundBox = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  padding: theme.spacing(5, 15, 5, 15),
}));

const CreateRoomPageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(5, 15, 5, 15),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),

  "& > *": {
    marginBottom: theme.spacing(2),
  },
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "row",
  justifyContent: "end",

  "& > button": {
    marginLeft: theme.spacing(2),
  },
}));

export default CreateRoomPage;
