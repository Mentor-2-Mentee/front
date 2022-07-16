import axiosInstance from "./axiosInstance";

export const getLiveRoomList = async (query: any): Promise<any> => {
  console.log("getQuerys", query);
  try {
    const response = await axiosInstance().get(
      `/live-rooms?page=${query.page}&limit=${
        query.limit
      }&filter=${JSON.stringify(query.filter)}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
