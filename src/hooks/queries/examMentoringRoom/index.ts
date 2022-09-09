import { QueryClient } from "@tanstack/react-query";

export const examMentoringRoomQueryClient = new QueryClient();

export * from "./usePostExamMentoringRoomFormMutation";
export * from "./useGetExamMentoringRoomQuery";

export * from "./useQuestionSocketQuery";
