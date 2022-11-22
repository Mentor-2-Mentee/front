import { UserProfile } from "../auth";
import { QuestionType } from "../examQuestion";

export enum UploadType {
  TEXT = "직접 작성",
  IMAGE = "사진 업로드",
}

export type Question = {
  id: number;
  rootTag?: string;
  detailTag: string[];
  questionText: string;
  solution: string | null;
};

export type QuestionPostForm = {
  uploadType?: keyof typeof UploadType;
  questionForm: Omit<Question, "id">;
  guestName?: string;
  guestPassword?: string;
  title?: string;
  description?: string;
};

export type QuestionPost = {
  id: number;
  questionId: number;
  question: Question;
  title: string;
  description: string;
  authorId: number | null;
  author: UserProfile | null;
  guestName: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  postComment: QuestionPostComment[];
};

export type QuestionPostComment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  questionPostId: number;
  commentLevel?: number;
  parentCommentId?: number;
  comment: string;
  author: string;
  authorId: string;
};

export * from "./useGetQuestionPostListQuery";
export * from "./usePostQuestionPostMutation";
export * from "./useGetQuestionPostMaxPageQuery";
export * from "./useGetQuestionPostQuery";
