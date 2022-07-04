import axiosInstance from "./axiosInstance";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const getAuthTokens = async (
  code: string
): Promise<AuthTokens | null> => {
  try {
    const response = await axiosInstance().post("/auth/token", {
      code,
    });
    return response.data;
  } catch (error) {
    console.log("토큰 발급 실패", error);
    return null;
  }
};
