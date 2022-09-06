import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import ApiFetchEventHandler from "../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useQuery } from "@tanstack/react-query";
import {
  createExamSchedule,
  ExamScheduleCacheDataEntity,
  updateExamSchedule,
} from "../../hooks/queries/examSchedule";
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
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();

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
    <BackgroundBox>
      <CreateExamSchedulePageContainer>
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
      </CreateExamSchedulePageContainer>
    </BackgroundBox>
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
