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
  createTestSchedule,
  TestScheduleCacheDataEntity,
  updateTestSchedule,
} from "../../hooks/queries/testSchedule";
import { debouncedSubmitTestScheduleForm, imageUrlBlobToFile } from "./utils";
import {
  CreateTestScheduleHeader,
  InputTestDescription,
  InputTestScheduleTitle,
  InputTestUrl,
  SubmitTestScheduleButtonList,
  TestDatePicker,
  TestFieldSelector,
} from "./Components";

export type CreateTestSchedulePageMode = "CREATE" | "UPDATE";

export const CreateTestSchedulePage = (): JSX.Element => {
  const search = useLocation().search;
  const targetTestScheduleId = new URLSearchParams(search).get(
    "testScheduleId"
  );
  const targetTestDate = new URLSearchParams(search).get("testDate");

  const [mode, setMode] = useState<CreateTestSchedulePageMode>("CREATE");

  const [testScheduleTitle, setTestScheduleTitle] = useState<string>("");
  const [testUrl, setTestUrl] = useState<string>("");
  const [testDate, setTestDate] = useState<Date | null>(null);
  const [testField, setTestField] = useState<string>("");
  const [imageFileList, setImageFileList] = useState<ImageFile[]>([]);
  const [testDescription, setTestDescription] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const navigation = useNavigate();

  const { data } = useQuery<TestScheduleCacheDataEntity>(["testSchedule"]);

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
    if (!targetTestScheduleId || !targetTestDate || !data) return;
    const updateTestSchedule = data.testScheduleMap
      .get(targetTestDate)
      ?.find((ele) => ele.testScheduleId === Number(targetTestScheduleId));
    if (!updateTestSchedule) return;
    setTestScheduleTitle(updateTestSchedule.testScheduleTitle);
    setTestUrl(updateTestSchedule.testUrl);
    setTestDate(updateTestSchedule.testDate);
    setTestField(updateTestSchedule.testField);

    load(updateTestSchedule.imageFiles);
    setTestDescription(updateTestSchedule.testDescription);
    setMode("UPDATE");
  }, []);

  return (
    <BackgroundBox>
      <CreateTestSchedulePageContainer>
        <CreateTestScheduleHeader />
        <InputTestScheduleTitle
          useTestScheduleTitleState={[testScheduleTitle, setTestScheduleTitle]}
        />
        <InputTestUrl useTestUrlState={[testUrl, setTestUrl]} />
        <TestDatePicker useTastDateState={[testDate, setTestDate]} />
        <TestFieldSelector useTestFieldState={[testField, setTestField]} />
        <InputTestDescription
          useTestDescriptionState={[testDescription, setTestDescription]}
        />
        <ImageUpload
          imageFileList={imageFileList}
          setImageFileList={setImageFileList}
        />
        <SubmitTestScheduleButtonList
          useModeState={[mode, setMode]}
          debouncedSubmitTestScheduleForm={debouncedSubmitTestScheduleForm({
            mode,
            createParams: {
              testScheduleTitle,
              testUrl,
              testDate,
              testField,
              imageFileList,
              testDescription,
            },
            updateParams: {
              testScheduleId: Number(targetTestScheduleId),
              testScheduleTitle,
              testUrl,
              testDate: testDate === null ? new Date() : testDate,
              testField,
              imageFileList,
              testDescription,
              imageFiles: imageFileList.map((imageFile) => imageFile.imageURL),
            },
          })}
        />
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

export default CreateTestSchedulePage;
