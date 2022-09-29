import { QueryClient } from "@tanstack/react-query";

export type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_QUESTION";

export interface ExamQuestion {
  examQuestionId: number;
  questionText: string;
  answerExampleList: string[];
  answer: string;
  questionImageUrl: string[];
  solution: string;
  questionType: QuestionType;
}

export interface ExamReviewRoomQueryCache {
  examQuestionList: ExamQuestion[];
  liveWrittingUser: number[];
}

export const examReviewRoomQueryClient = new QueryClient();

export * from "./usePostExamReviewRoomFormMutation";
export * from "./useGetExamReviewRoomQuery";

export * from "./useQuestionSocketQuery";
