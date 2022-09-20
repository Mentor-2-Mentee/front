import { QueryClient } from "@tanstack/query-core";

export interface QuestionTag {
  parentTag?: string;
  tagName: string;
}

export const questionTagQueryClient = new QueryClient();

export * from "./useGetQuestionTagQuery";
export * from "./usePostQuestionTagMutation";
export * from "./useDeleteQuestionTagMutation";
