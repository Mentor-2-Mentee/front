import {
  Box,
  Button,
  Container,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useCallback, useEffect } from "react";
import { useState } from "react";

import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { usePostMentoringRoomMutation } from "../../hooks/queries/mentoringRoom";
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../hooks/queries/questionTag";
import { useSnackbar } from "notistack";

import {
  CreateMentoringRoomHeader,
  InputMentoringRoomDescription,
  InputMentoringRoomTitle,
  AfterCreateModal,
} from "./Components";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useNavigate } from "react-router";

export const CreateRoomPage = (): JSX.Element => {
  const [mentoringRoomTitle, setMentoringRoomTitle] = useState<string>("");
  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [mentoringRoomDescription, setMentoringRoomDescription] =
    useState<string>("");
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [createdURL, setCreatedURL] = useState<string>();
  const [tagList, setTagList] = useState<QuestionTag[]>([]);

  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const questionTagQuery = useGetQuestionTagQuery();
  const mentoringRoomMutation = usePostMentoringRoomMutation(
    enqueueSnackbar,
    setCreatedURL
  );

  const handleSubmitButton = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    mentoringRoomMutation.mutate({
      token,
      mentoringRoomTitle,
      mentoringRoomDescription,
      appliedTagOptions,
      imageFileList,
    });
  }, [
    mentoringRoomTitle,
    mentoringRoomDescription,
    appliedTagOptions,
    imageFileList,
  ]);

  const handleCancelButton = () => navigation(-1);

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  const preventMovePage = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", preventMovePage);
    if (createdURL) {
      window.removeEventListener("beforeunload", preventMovePage);
    }
    return () => {
      window.removeEventListener("beforeunload", preventMovePage);
    };
  }, [createdURL, preventMovePage]);

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box sx={PageInnerBoxSxProps(isWidthShort)}>
        <CreateMentoringRoomHeader />
        <InputMentoringRoomTitle
          useMentoringRoomTitleState={[
            mentoringRoomTitle,
            setMentoringRoomTitle,
          ]}
        />
        <FilterOptionHandler
          tagList={tagList}
          useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
          tagOnly
        />
        <InputMentoringRoomDescription
          useMentoringRoomDescriptionState={[
            mentoringRoomDescription,
            setMentoringRoomDescription,
          ]}
        />
        <ImageUpload
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
        <Box
          sx={{
            display: "flex",
            flexFlow: "row",
            justifyContent: "end",
            marginTop: 2,

            "& > button": {
              marginLeft: 2,
            },
          }}
        >
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
          <Button variant="contained" onClick={handleSubmitButton}>
            등록하기
          </Button>
        </Box>
        <AfterCreateModal url={createdURL} />
      </Box>
    </Container>
  );
};

const PageContainerSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    background: SignatureColor.GRAY,
    padding: isWidthShort
      ? theme.spacing(2, 2, 2, 2)
      : theme.spacing(4, 4, 4, 4),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
  });

const PageInnerBoxSxProps =
  (isWidthShort: boolean): SxProps<Theme> =>
  (theme: Theme) => ({
    padding: isWidthShort
      ? theme.spacing(3, 3, 3, 3)
      : theme.spacing(6, 6, 6, 6),
    background: SignatureColor.WHITE,
    borderRadius: theme.spacing(3),
    minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,
  });

export default CreateRoomPage;
