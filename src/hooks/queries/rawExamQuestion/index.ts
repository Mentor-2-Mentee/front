import { UserProfile } from "../auth";

export type RawExamQuestion = {
  id: number;
  createdAt: string;
  updatedAt: string;
  examQuestionId: number;
  authorId: string;
  questionText: string;
  solution: string | null;
  author: UserProfile;
};
