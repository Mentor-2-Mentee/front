import { styled } from "@mui/system";
import { useCallback, useEffect } from "react";
import { useState } from "react";

import FilterOptionHandler, {
  FilterOption,
} from "../../commonElements/FilterOptionHandler";
import ImageUpload, { ImageFile } from "../../commonElements/ImageUpload";
import { SignatureColor } from "../../commonStyles/CommonColor";
import { QuestionTag } from "../../models";

import {
  CreateMentoringRoomHeader,
  InputMentoringRoomDescription,
  InputMentoringRoomTitle,
  SubmitMentoringRoomFormButtonList,
  AfterCreateModal,
} from "./Components";
import {
  debouncedSubmitMentoringRoomForm,
  injectCreatedUrlEffectCallback,
  injectInitialEffectCallback,
} from "./utils";

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
  const [createdURL, setCreatedURL] = useState<string>("");
  const [tagList, setTagList] = useState<QuestionTag[]>([]);

  useEffect(injectInitialEffectCallback({ setTagList }), []);
  useEffect(injectCreatedUrlEffectCallback(), [createdURL]); //고쳐야함

  return (
    <BackgroundBox>
      <CreateRoomPageContainer>
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
        <SubmitMentoringRoomFormButtonList
          debouncedCreateQuestionRoom={debouncedSubmitMentoringRoomForm({
            params: {
              appliedTagOptions,
              mentoringRoomTitle,
              mentoringRoomDescription,
              imageFileList,
            },
            setCreatedURL,
          })}
        />
        <AfterCreateModal isCreated={Boolean(createdURL)} url={createdURL} />
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

export default CreateRoomPage;
