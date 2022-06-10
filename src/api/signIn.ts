// import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

export interface SignInParams {
  email: string;
  password: string;
}

export const signInByEmail = async (param: SignInParams): Promise<void> => {
  try {
    const response = await axiosInstance().post("/authorize/email", param);
    return response.data;
  } catch (error) {
    throw new Error(`SignIn failed by ${error}`);
  }
};
