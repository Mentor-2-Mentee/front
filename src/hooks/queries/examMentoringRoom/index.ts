import { QueryClient } from "@tanstack/react-query";

export type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_QUESTION";

export interface ExamQuestion {
  examQuestionId: number;
  questionText: string;
  answerExampleList: string[];
  answer: string;
  questionImagesUrl: string[];
  solution: string;
  questionType: QuestionType;
}

export interface ExamMentoringRoomQueryCache {
  examQuestionList: ExamQuestion[];
  liveWrittingUser: number[];
}

export const examMentoringRoomQueryClient = new QueryClient();

export * from "./usePostExamMentoringRoomFormMutation";
export * from "./useGetExamMentoringRoomQuery";

export * from "./useQuestionSocketQuery";
