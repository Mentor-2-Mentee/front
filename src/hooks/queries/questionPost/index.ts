import { QueryClient } from "@tanstack/query-core";
import { UserProfile } from "../auth";

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