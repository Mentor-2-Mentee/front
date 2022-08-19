import { styled } from "@mui/system";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import ApiFetchEventHandler from "../../utils/ApiFetchEventHandler";
import { getCookieValue } from "../../utils/handleCookieValue";
import { useQuery } from "react-query";
import {
  createTestSchedule,
  TestScheduleCacheDataEntity,
  updateTestSchedule,
} from "../../hooks/queries/testSchedule";
import { imageUrlBlobToFile } from "./imageUrlBlobToFile";
import {
  CreateTestScheduleHeader,
  InputTestDescription,
  InputTestScheduleTitle,
  InputTestUrl,
  SubmitTestScheduleButtonList,
  TestDatePicker,
  TestFieldSelector,
} from "./Components";
import axiosInstance from "../../api/axiosInstance";

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
      const response =
        mode === "CREATE"
          ? await createTestSchedule({
              token: accessToken,
              testScheduleTitle,
              testUrl,
              testDate,
              testField,
              imageFileList,
              testDescription,
            })
          : await updateTestSchedule({
              token: accessToken,
              testScheduleId: Number(targetTestScheduleId),
              testScheduleTitle,
              testUrl,
              testDate: new Date(),
              testField,
              imageFileList,
              testDescription,
              imageFiles: ["메롱"],
            });

      console.log("response", response);

      enqueueSnackbar(`새 시험일정이 등록되었습니다. `, {
        variant: "success",
      });
      navigation(`/test-schedule#${response.data.testScheduleId}`);
    } catch (error) {
      console.log(error);
      enqueueSnackbar("새 시험일정 등록에 실패했습니다.", { variant: "error" });
    }
  };

  const handleSubmitTestScheduleForm = new ApiFetchEventHandler(
    submitTestScheduleForm,
    500
  );

  const debouncedSubmitTestScheduleForm = () => {
    handleSubmitTestScheduleForm.debounce();
  };

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
        <SubmitTestScheduleButtonList useModeState={[mode, setMode]} />
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
