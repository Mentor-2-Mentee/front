export interface QuestionTag {
  parentTag?: string;
  tagName: string;
}

export * from "./useGetQuestionTagQuery";
export * from "./usePostQuestionTagMutation";
export * from "./useDeleteQuestionTagMutation";
