import { QueryClient } from "@tanstack/query-core";
import { FilterOption } from "../../../commonElements/FilterOptionHandler";
import { ImageFile } from "../../../commonElements/ImageUpload";

export enum UploadType {
  TEXT = "직접 작성",
  IMAGE = "사진 업로드",
}

type Question = {
  questionId: number;
  rootTag?: string;
  detailTag: string[];
  questionType?: string;
  questionText?: string;
  answerExample: string[];
  questionImageUrl: string[];
};

export type QuestionForm = {
  uploadType?: keyof typeof UploadType;
  question: Omit<Question, "questionId">;
  questionPostTitle?: string;
  questionPostDescription?: string;
};

export type QuestionPost = {
  questionPostId: number;
  questionId: number;
  question: Question;
  questionPostTitle: number;
  questionDescription: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
};

export const questionPostQueryClient = new QueryClient();

export * from "./useGetQuestionPostQuery";
