import axiosInstance from "./axiosInstance";

export const getLiveRoomList = async (query: any): Promise<any> => {
  try {
    const response = await axiosInstance().get(
      `/live-rooms?search=${query.keyword}&filter=${query.par}&page=${query.page}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
