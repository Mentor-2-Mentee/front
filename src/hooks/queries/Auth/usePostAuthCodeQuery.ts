import { useQuery } from "react-query";
import { userQueryClient } from ".";
import axiosInstance from "../../../api/axiosInstance";

const postAuthCode = (authCode?: string): Promise<any> => {
  return typeof authCode === "undefined"
    ? Promise.reject(new Error("Invalid AuthCode"))
    : axiosInstance()
        .post("/oauth/token", { code: authCode, type: "query" })
        .then((response) => response.data);
};

export const usePostAuthCodeQuery = (authCode?: string) =>
  useQuery(["token", authCode], () => postAuthCode(authCode), {
    enabled: Boolean(authCode),
    onSuccess: () => {
      userQueryClient.invalidateQueries(["token", authCode]);
    },
  });
