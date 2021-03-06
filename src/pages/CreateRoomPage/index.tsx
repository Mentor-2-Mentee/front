import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useState } from "react";
import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import { useNavigate } from "react-router-dom";

import { useSnackbar } from "notistack";
import ImageUpload, { ImageFile } from "./ImageUpload";
import { getCookieValue } from "../../utils/handleCookieValue";
import ApiFetchHandler from "../../utils/ApiFetchHandler";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { createNewQuestionRoom } from "../../api/createNewQuestionRoom";
import { AfterCreateModal } from "./AfterCreateModal";
import { QuestionTag } from "../../models";
import { getQuestionTagList } from "../../api/getQuestionTagList";

export const CreateRoomPage = (): JSX.Element => {
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [explainRoomText, setExplainRoomText] = useState<string | undefined>();
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [createdURL, setCreatedURL] = useState<string>("");
  const [tagList, setTagList] = useState<QuestionTag[]>([]);
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
      enqueueSnackbar("????????? ??? ????????? ?????????.", { variant: "warning" });
      return;
    }

    if (roomTitle === "") {
      enqueueSnackbar("????????? ????????? ?????????.", { variant: "warning" });
      return;
    }

    try {
      const response = await createNewQuestionRoom({
        token: accessToken,
        roomTitle,
        appliedTagOptions,
        explainRoomText,
        imageFileList,
      });

      enqueueSnackbar(`??? ?????????????????? ?????????????????????. ${response.url}`, {
        variant: "success",
      });
      setCreatedURL(response.url);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("??????????????? ????????? ??????????????????.", { variant: "error" });
    }
  };

  const handleCreateQuestionRoom = new ApiFetchHandler<void>(
    createQuestionRoom,
    500
  );

  const debouncedCreateQuestionRoom = () => {
    handleCreateQuestionRoom.debounce();
  };

  const setInitialTagList = async () => {
    const { data } = await getQuestionTagList();
    setTagList(data);
  };

  useEffect(() => {
    setInitialTagList();
    window.addEventListener("beforeunload", injectPreventLeavePageEvent);
    return () => {
      window.removeEventListener("beforeunload", injectPreventLeavePageEvent);
    };
  }, []);

  useEffect(() => {
    window.removeEventListener("beforeunload", injectPreventLeavePageEvent);
  }, [createdURL]);

  return (
    <BackgroundBox>
      <CreateRoomPageContainer>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          ????????????
        </Typography>
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="????????? ????????? ?????????"
          fullWidth
          value={roomTitle}
          onChange={handleInputRoomTitle}
        />
        <FilterOptionHandler
          tagList={tagList}
          useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
          tagOnly
        />
        <TextField
          variant="outlined"
          name="title"
          size="small"
          placeholder="????????? ?????? ????????? ????????? ???????????????"
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
            ??????
          </Button>
          <Button variant="contained" onClick={debouncedCreateQuestionRoom}>
            ????????????
          </Button>
          <AfterCreateModal isCreated={Boolean(createdURL)} url={createdURL} />
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

export default CreateRoomPage;
