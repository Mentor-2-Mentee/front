import { RawExamQuestion } from "../rawExamQuestion";

export type QuestionType = "MULTIPLE_CHOICE" | "ESSAY_QUESTION";
// export type EnterUserType = "관리자" | "도우미" | "응시자" | "미응시자";

export interface ExamQuestion {
  id: number;
  questionText: string;
  solution: string;
  examOrganizer: string;
  examType: string;
  rawExamQuestionList: RawExamQuestion[];
  examQuestionCommentList: ExamQuestionComment[];
}

export type ExamQuestionComment = {
  id: number;
  createdAt: string;
  updatedAt: string;
  examQuestionId: number;
  commentLevel?: number;
  parentCommentId?: number;
  comment: string;
  author: string;
  authorId: string;
};
