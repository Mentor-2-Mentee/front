import { QueryClient } from "@tanstack/react-query";

export const authQueryClient = new QueryClient();

export * from "./usePostAuthCodeQuery";
export * from "./useGetUserProfileQuery";
