import { Box, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import FilterOptionHandler, {
  FilterOption,
} from "../../../../commonElements/FilterOptionHandler";
import {
  QuestionPostForm,
  UploadType,
} from "../../../../hooks/queries/questionPost";
import {
  QuestionTag,
  useGetQuestionTagQuery,
} from "../../../../hooks/queries/questionTag";

import MarkupEditer from "../../../../commonElements/MarkupEditer";
import { QuestionEditer } from "../../../../commonElements/QuestionEditer";
import { RootContext } from "../../../../hooks/context/RootContext";

interface StepContentsProps {
  stepIndex: number;
  useQuestionPostFormState: [
    QuestionPostForm,
    React.Dispatch<React.SetStateAction<QuestionPostForm>>
  ];
}

export const QuestionStepContents = ({
  stepIndex,
  useQuestionPostFormState,
}: StepContentsProps) => {
  const { id, userName } = useContext(RootContext);

  const [questionPostForm, setQuestionPostForm] = useQuestionPostFormState;
  const [guestName, setGuestName] = useState<string>("");
  const [guestPassword, setGuestPassword] = useState<string>("");

  const [appliedTagOptions, setAppliedTagOptions] = useState<FilterOption>({
    rootFilterTag: undefined,
    childFilterTags: [],
    filterKeywords: [],
  });
  const [questionText, setQuestionText] = useState<string>("");
  const [questionPostTitle, setQuestionPostTitle] = useState<string>("");
  const [questionPostDescription, setQuestionPostDescription] =
    useState<string>("");

  const [tagList, setTagList] = useState<QuestionTag[]>([]);

  const questionTagQuery = useGetQuestionTagQuery();

  const handleInputPostTitle = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuestionPostTitle(event.target.value);
  const handleGuestNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setGuestName(event.target.value);
  const handleGuestPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setGuestPassword(event.target.value);

  useEffect(() => {
    if (questionTagQuery.status !== "success") return;
    setTagList(questionTagQuery.data.questionTagList);
  }, [questionTagQuery.status, questionTagQuery.data]);

  //step 1
  useEffect(() => {
    setQuestionPostForm({
      ...questionPostForm,
      questionForm: {
        ...questionPostForm.questionForm,
        rootTag: appliedTagOptions.rootFilterTag,
        detailTag: appliedTagOptions.childFilterTags.map((tag) => tag.tagName),
      },
    });
  }, [appliedTagOptions]);

  //step 2
  useEffect(() => {
    setQuestionPostForm({
      ...questionPostForm,
      questionForm: {
        ...questionPostForm.questionForm,
        questionText: questionText,
      },
    });
  }, [questionText]);

  //step 3

  useEffect(() => {
    setQuestionPostForm({
      ...questionPostForm,
      guestName,
      guestPassword,
    });
  }, [guestName, guestPassword]);

  useEffect(() => {
    setQuestionPostForm({
      ...questionPostForm,
      title: questionPostTitle,
    });
  }, [questionPostTitle]);

  useEffect(() => {
    setQuestionPostForm({
      ...questionPostForm,
      description: questionPostDescription,
    });
  }, [questionPostDescription]);

  switch (stepIndex) {
    case 0:
      return (
        <>
          <FilterOptionHandler
            tagList={tagList}
            useFilterOptionState={[appliedTagOptions, setAppliedTagOptions]}
            tagOnly
            tagLineSeparate
          />
          {/* {appliedTagOptions.rootFilterTag === undefined ? null : (
            <div>혹시 이런 문제가 궁금하신건가요? (클릭시 이동)</div>
          )} */}
        </>
      );

    case 1:
      return <QuestionEditer useTextState={[questionText, setQuestionText]} />;

    case 2:
      return (
        <Box>
          {id === undefined ? (
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="outlined"
                name="title"
                size="small"
                label="닉네임"
                error={guestName.length > 10}
                helperText={
                  guestName.length > 10 ? "닉네임은 10자 이하만 가능" : ""
                }
                disabled={Boolean(userName)}
                sx={{ mr: 1 }}
                value={userName ? userName : guestName}
                onChange={handleGuestNameChange}
              />
              <TextField
                variant="outlined"
                name="title"
                size="small"
                label="비밀번호"
                type={"password"}
                error={guestPassword.length > 36}
                helperText={
                  guestPassword.length > 10 ? "비밀번호는 36자 이하만 가능" : ""
                }
                value={guestPassword}
                onChange={handleGuestPasswordChange}
                sx={{ mr: 2 }}
              />
            </Box>
          ) : null}
          <TextField
            size="small"
            label="게시글 제목"
            fullWidth
            sx={{ mb: 2 }}
            value={questionPostTitle}
            onChange={handleInputPostTitle}
          />

          <MarkupEditer
            usePostState={[questionPostDescription, setQuestionPostDescription]}
          />
        </Box>
      );

    default:
      return <div>{null}</div>;
  }
};

export default QuestionStepContents;
