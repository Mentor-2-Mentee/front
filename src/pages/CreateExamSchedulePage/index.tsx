import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { useGetExamScheduleQuery } from "../../hooks/queries/examSchedule";
import {
  CreateExamScheduleHeader,
  InputExamDescription,
  InputExamScheduleTitle,
  InputExamUrl,
  SubmitExamScheduleButtonList,
  ExamDatePicker,
  ExamFieldSelector,
} from "./Components";
import { Box, Container, SxProps, Theme, useMediaQuery } from "@mui/material";
import { useUpdateExamScheduleMutation } from "../../hooks/queries/examSchedule/useUpdateExamScheduleMutation";
import { getCookieValue } from "../../utils/handleCookieValue";
import DateFormatting from "../../utils/dateFormatting";
import { usePostExamScheduleMutation } from "../../hooks/queries/examSchedule/usePostExamScheduleMutation";
import { imageUrlBlobToFile } from "../../utils/imageUrlBlobToFile";

export const CreateExamSchedulePage = (): JSX.Element => {
  const search = useLocation().search;
  const targetExamScheduleId = Number(
    new URLSearchParams(search).get("examScheduleId")
  );
  const isUpdate = Boolean(new URLSearchParams(search).get("update"));

  const navigation = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const isWidthShort = useMediaQuery("(max-width:900px)");
  const examScheduleQuery = useGetExamScheduleQuery({
    examScheduleId: targetExamScheduleId,
  });

  const postExamScheduleMutation = usePostExamScheduleMutation(
    navigation,
    enqueueSnackbar
  );
  const updateExamScheduleMutation = useUpdateExamScheduleMutation(
    targetExamScheduleId,
    navigation,
    enqueueSnackbar
  );

  const [examScheduleTitle, setExamScheduleTitle] = useState<string>("");
  const [examUrl, setExamUrl] = useState<string>("");
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [examField, setExamField] = useState<string>("");
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [examDescription, setExamDescription] = useState<string>("");
  const examScheduleDependency = [
    targetExamScheduleId,
    examScheduleTitle,
    examUrl,
    examDate,
    examField,
    imageFileList,
    examDescription,
  ];

  const setCurrentImageFileList = useCallback(
    async (imageUrlList: string[]) => {
      const fileList: ImageFile[] = [];
      for (const imageUrl of imageUrlList) {
        const file = await imageUrlBlobToFile(imageUrl);
        fileList.push({
          fileData: file,
          fileName: file.name,
          imageURL: imageUrl,
        });
      }
      setImageFileList(fileList);
    },
    []
  );

  const submitExamSchedule = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }
    const commonParams = {
      token,
      examScheduleTitle,
      examUrl,
      examDate:
        examDate === null
          ? new DateFormatting(new Date()).YYYY_MM_DD
          : new DateFormatting(new Date(examDate)).YYYY_MM_DD,
      examField,
      imageFileList,
      examDescription,
    };
    if (isUpdate) {
      updateExamScheduleMutation.mutate({
        examScheduleId: targetExamScheduleId,
        ...commonParams,
      });
      return;
    }
    postExamScheduleMutation.mutate(commonParams);
  }, [isUpdate, ...examScheduleDependency]);

  useEffect(() => {
    if (!isUpdate) return;
    if (examScheduleQuery.status !== "success") return;
    setExamScheduleTitle(examScheduleQuery.data.examScheduleTitle);
    setExamUrl(examScheduleQuery.data.examUrl);
    setExamDate(new Date(examScheduleQuery.data.examDate));
    setExamField(examScheduleQuery.data.examField);
    setExamDescription(examScheduleQuery.data.examDescription);
    setCurrentImageFileList(examScheduleQuery.data.imageFiles);
  }, [isUpdate, examScheduleQuery.status, examScheduleQuery.data]);

  if (isUpdate && examScheduleQuery.status === "loading")
    return <div>Loading...</div>;
  if (isUpdate && examScheduleQuery.status === "error")
    return <div>Error!</div>;

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box sx={PageInnerBoxSxProps(isWidthShort)}>
        <CreateExamScheduleHeader />
        <InputExamScheduleTitle
          useExamScheduleTitleState={[examScheduleTitle, setExamScheduleTitle]}
        />
        <InputExamUrl useExamUrlState={[examUrl, setExamUrl]} />
        <ExamDatePicker useTastDateState={[examDate, setExamDate]} />
        <ExamFieldSelector useExamFieldState={[examField, setExamField]} />
        <InputExamDescription
          useExamDescriptionState={[examDescription, setExamDescription]}
        />
        <ImageUpload
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
        <SubmitExamScheduleButtonList
          isUpdate={isUpdate}
          submitExamScheduleCallback={submitExamSchedule}
        />
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

    "& > *": {
      marginBottom: theme.spacing(3),
    },
  });

export default CreateExamSchedulePage;
