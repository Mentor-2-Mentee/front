import axiosInstance from "./axiosInstance";

export interface AuthTokens {
  isFirstSignIn: boolean;
  accessToken: string;
  refreshToken: string;
}

export const getAuthTokens = async (code: string): Promise<AuthTokens> => {
  try {
    const response = await axiosInstance().post("/oauth/token", {
      code,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw `token error : ${error}`;
  }
};
