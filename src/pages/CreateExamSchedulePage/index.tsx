import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { useQuery } from "@tanstack/react-query";
import { ExamScheduleCacheDataEntity } from "../../hooks/queries/examSchedule";
import { debouncedSubmitExamScheduleForm, imageUrlBlobToFile } from "./utils";
import {
  CreateExamScheduleHeader,
  InputExamDescription,
  InputExamScheduleTitle,
  InputExamUrl,
  SubmitExamScheduleButtonList,
  ExamDatePicker,
  ExamFieldSelector,
} from "./Components";
import DateFormatting from "../../utils/dateFormatting";
import { Box, useMediaQuery } from "@mui/material";

export type CreateExamSchedulePageMode = "CREATE" | "UPDATE";

export const CreateExamSchedulePage = (): JSX.Element => {
  const search = useLocation().search;
  const targetExamScheduleId = new URLSearchParams(search).get(
    "examScheduleId"
  );
  const targetExamDate = new URLSearchParams(search).get("examDate");

  const [mode, setMode] = useState<CreateExamSchedulePageMode>("CREATE");

  const [examScheduleTitle, setExamScheduleTitle] = useState<string>("");
  const [examUrl, setExamUrl] = useState<string>("");
  const [examDate, setExamDate] = useState<Date | null>(null);
  const [examField, setExamField] = useState<string>("");
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [examDescription, setExamDescription] = useState<string>("");
  const isWidthShort = useMediaQuery("(max-width:900px)");

  const { data } = useQuery<ExamScheduleCacheDataEntity>(["examSchedule"]);

  const load = async (urlList: string[]) => {
    let fileList: ImageFile[] = [];

    for (const url of urlList) {
      const file = await imageUrlBlobToFile(`${url}`);
      fileList.push({
        fileData: file,
        fileName: file.name,
        imageURL: `${import.meta.env.VITE_APP_BASEURL}/${url}`,
      });
    }

    setImageFileList(fileList);
  };

  useEffect(() => {
    if (!targetExamScheduleId || !targetExamDate || !data) return;
    const updateExamSchedule = data.examScheduleMap
      .get(targetExamDate)
      ?.find((ele) => ele.examScheduleId === Number(targetExamScheduleId));
    if (!updateExamSchedule) return;
    setExamScheduleTitle(updateExamSchedule.examScheduleTitle);
    setExamUrl(updateExamSchedule.examUrl);
    setExamDate(new Date(updateExamSchedule.examDate));
    setExamField(updateExamSchedule.examField);

    load(updateExamSchedule.imageFiles);
    setExamDescription(updateExamSchedule.examDescription);
    setMode("UPDATE");
  }, []);

  return (
    <Box
      sx={(theme) => ({
        background: SignatureColor.GRAY,
        padding: isWidthShort
          ? theme.spacing(2, 2, 2, 2)
          : theme.spacing(4, 4, 4, 4),
        minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(10)})`,
      })}
    >
      <Box
        sx={(theme) => ({
          padding: isWidthShort
            ? theme.spacing(3, 3, 3, 3)
            : theme.spacing(6, 6, 6, 6),
          background: SignatureColor.WHITE,
          borderRadius: theme.spacing(3),
          minHeight: `calc((var(--vh, 1vh) * 100) - ${theme.spacing(14)})`,

          "& > *": {
            marginBottom: theme.spacing(3),
          },
        })}
      >
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
          useModeState={[mode, setMode]}
          debouncedSubmitExamScheduleForm={debouncedSubmitExamScheduleForm({
            mode,
            createParams: {
              examScheduleTitle,
              examUrl,
              examDate,
              examField,
              imageFileList,
              examDescription,
            },
            updateParams: {
              examScheduleId: Number(targetExamScheduleId),
              examScheduleTitle,
              examUrl,
              examDate:
                examDate === null
                  ? new DateFormatting(new Date()).YYYY_MM_DD
                  : new DateFormatting(new Date(examDate)).YYYY_MM_DD,
              examField,
              imageFileList,
              examDescription,
              imageFiles: imageFileList.map((imageFile) => imageFile.imageURL),
            },
          })}
        />
      </Box>
    </Box>
  );
};

const BackgroundBox = styled("div")(({ theme }) => ({
  background: SignatureColor.GRAY,
  padding: theme.spacing(5, 15, 5, 15),
}));

const CreateExamSchedulePageContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(5, 15, 5, 15),
  background: SignatureColor.WHITE,
  borderRadius: theme.spacing(3),
}));

export default CreateExamSchedulePage;
