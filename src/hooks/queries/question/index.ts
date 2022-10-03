import { FilterOption } from "../../../commonElements/FilterOptionHandler";
import { ImageFile } from "../../../commonElements/ImageUpload";

export enum UploadType {
  TEXT = "직접 작성",
  IMAGE = "사진 업로드",
}

export type QuestionForm = {
  uploadType?: keyof typeof UploadType;
  question: {
    tagOption: FilterOption;
    questionType?: string;
    questionText?: string;
    answerExample: string[];
    questionImageUrl: string[];
  };
  questionTitle?: string;
  questionDescription?: string;
};

export * from "./usePostQuestionImageMutation";
