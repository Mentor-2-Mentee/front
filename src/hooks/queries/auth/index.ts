import { QueryClient } from "@tanstack/react-query";

export interface UserProfile {
  id: string;
  userName: string;
  userGrade: string;
}

export const authQueryClient = new QueryClient();

export * from "./useGetTokenQuery";
export * from "./useGetUserProfileQuery";
export * from "./useGetNewNameCheckQuery";
export * from "./useUpdateUserProfileMutation";
