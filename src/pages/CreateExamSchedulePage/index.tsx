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
  const [examType, setExamField] = useState<string>("");

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [examDescription, setExamDescription] = useState<string>("");
  const examScheduleDependency = [
    targetExamScheduleId,
    examScheduleTitle,
    examUrl,
    examDate,
    examType,
    imageUrl,
    examDescription,
  ];

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
      examType,
      imageUrl,
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
    setExamScheduleTitle(examScheduleQuery.data.organizer);
    setExamUrl(examScheduleQuery.data.examUrl);
    setExamDate(new Date(examScheduleQuery.data.examDate));
    setExamField(examScheduleQuery.data.scheduleType);
    setExamDescription(examScheduleQuery.data.description);
    // setCurrentImageFileList(examScheduleQuery.data.imageFiles);
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
        <ExamFieldSelector useExamFieldState={[examType, setExamField]} />
        <InputExamDescription
          useExamDescriptionState={[examDescription, setExamDescription]}
        />
        <ImageUpload
          useImageUrlState={[imageUrl, setImageUrl]}
          multipleUpload
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
