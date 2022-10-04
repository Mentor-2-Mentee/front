import { FilterOption } from "../../../commonElements/FilterOptionHandler";
import { ImageFile } from "../../../commonElements/ImageUpload";

export enum UploadType {
  TEXT = "직접 작성",
  IMAGE = "사진 업로드",
}

export type QuestionForm = {
  uploadType?: keyof typeof UploadType;
  question: {
    rootTag?: string;
    detailTag: string[];
    questionType?: string;
    questionText?: string;
    answerExample: string[];
    questionImageUrl: string[];
  };
  questionPostTitle?: string;
  questionPostDescription?: string;
};

export * from "../images/usePostImageMutation";
