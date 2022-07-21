import { AxiosRequestConfig } from "axios";
import axiosInstance from "../axiosInstance";

export const signInByKakao = async (): Promise<void> => {
  try {
    const response = await axiosInstance().get("/oauth/kakao");
    return response.data;
  } catch (error) {
    throw new Error(`SignIn failed by ${error}`);
  }
};
