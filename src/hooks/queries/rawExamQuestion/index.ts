export type RawExamQuestion = {
  id: number;
  createdAt: string;
  updatedAt: string;
  examQuestionId: number;
  authorId: string;
  questionText: string;
  solution?: string;
};
