import { QueryClient } from "@tanstack/react-query";

export interface UserProfile {
  id: string;
  userName: string;
  userGrade: string;
}

export * from "./useGetTokenQuery";
export * from "./useGetUserProfileQuery";
export * from "./useGetNewNameCheckQuery";
export * from "./useUpdateUserProfileMutation";
