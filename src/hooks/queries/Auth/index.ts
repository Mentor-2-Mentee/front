import { QueryClient } from "react-query";

export const userQueryClient = new QueryClient();

export * from "./usePostAuthCodeQuery";
export * from "./useGetUserProfileQuery";
