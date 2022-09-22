import { QueryClient } from "@tanstack/react-query";

export interface UserProfile {
  userId?: string;
  username?: string;
  userGrade?: string;
}

export const authQueryClient = new QueryClient();

export * from "./useGetTokenQuery";
export * from "./useGetUserProfileQuery";
export * from "./useGetNewNameCheckQuery";
export * from "./useUpdateUserProfileMutation";
