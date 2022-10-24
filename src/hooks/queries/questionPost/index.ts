import { QueryClient } from "@tanstack/query-core";
import { UserProfile } from "../auth";
import { QuestionType } from "../examReviewRoom";

export enum UploadType {
  TEXT = "직접 작성",
  IMAGE = "사진 업로드",
}

export type Question = {
  id: number;
  rootTag?: string;
  detailTag: string[];
  questionType?: QuestionType;
  questionText?: string;
  answerExample: string[];
  questionImageUrl: string[];
};

export type QuestionForm = {
  uploadType?: keyof typeof UploadType;
  question: Omit<Question, "id">;
  questionPostTitle?: string;
  questionPostDescription?: string;
};

export type QuestionPost = {
  id: number;
  questionId: number;
  question: Question;
  questionPostTitle: string;
  questionPostDescription: string;
  authorId: number;
  author: UserProfile;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
};

export const questionPostQueryClient = new QueryClient();

export * from "./useGetQuestionPostListQuery";
export * from "./usePostQuestionPostMutation";
export * from "./useGetQuestionPostMaxPageQuery";
export * from "./useGetQuestionPostQuery";
