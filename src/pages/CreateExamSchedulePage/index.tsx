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

  const { mutate: postExamScheduleMutate } = usePostExamScheduleMutation(
    navigation,
    enqueueSnackbar
  );
  const { mutate: updateExamScheduleMutate } = useUpdateExamScheduleMutation(
    targetExamScheduleId,
    navigation,
    enqueueSnackbar
  );

  const [organizer, setOrganizer] = useState<string>("");
  const [examUrl, setExamUrl] = useState<string>("");
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [scheduleType, setScheduleType] = useState<string>("");

  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const examScheduleDependency = [
    targetExamScheduleId,
    organizer,
    examUrl,
    examDate,
    scheduleType,
    imageUrl,
    description,
  ];

  const submitExamSchedule = useCallback(() => {
    const token = getCookieValue("accessToken");
    if (!token) {
      enqueueSnackbar("로그인 후 사용해 주세요.", { variant: "warning" });
      return;
    }

    if (isUpdate) {
      updateExamScheduleMutate({
        token,
        examScheduleForm: {
          id: targetExamScheduleId,
          organizer,
          examUrl,
          examDate:
            examDate === null
              ? new DateFormatting(new Date()).YYYY_MM_DD
              : new DateFormatting(new Date(examDate)).YYYY_MM_DD,
          scheduleType,
          description,
          imageUrl,
        },
      });
      return;
    }
    postExamScheduleMutate({
      token,
      examScheduleForm: {
        organizer,
        examUrl,
        examDate:
          examDate === null
            ? new DateFormatting(new Date()).YYYY_MM_DD
            : new DateFormatting(new Date(examDate)).YYYY_MM_DD,
        scheduleType,
        description,
        imageUrl,
      },
    });
  }, [isUpdate, ...examScheduleDependency]);

  useEffect(() => {
    if (!isUpdate) return;
    if (examScheduleQuery.status !== "success") return;
    setOrganizer(examScheduleQuery.data.organizer);
    setExamUrl(examScheduleQuery.data.examUrl);
    setExamDate(new Date(examScheduleQuery.data.examDate));
    setScheduleType(examScheduleQuery.data.scheduleType);
    setDescription(examScheduleQuery.data.description);
    setImageUrl(examScheduleQuery.data.imageUrl);
  }, [isUpdate, examScheduleQuery.status, examScheduleQuery.data]);

  if (isUpdate && examScheduleQuery.status === "loading")
    return <div>Loading...</div>;
  if (isUpdate && examScheduleQuery.status === "error")
    return <div>Error!</div>;

  return (
    <Container sx={PageContainerSxProps(isWidthShort)}>
      <Box sx={PageInnerBoxSxProps(isWidthShort)}>
        <CreateExamScheduleHeader />
        <InputExamScheduleTitle useOrganizerState={[organizer, setOrganizer]} />
        <InputExamUrl useExamUrlState={[examUrl, setExamUrl]} />
        <ExamDatePicker useTastDateState={[examDate, setExamDate]} />
        <ExamFieldSelector
          useScheduleTypeState={[scheduleType, setScheduleType]}
        />
        <InputExamDescription
          useDescriptionState={[description, setDescription]}
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
