import axiosInstance from "./axiosInstance";

export const getLiveRoomList = async (query: any): Promise<any> => {
  try {
    const response = await axiosInstance().get(
      `/live-rooms?page=${query.page}&limit=${
        query.limit
      }&filter=${JSON.stringify(query.filter)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
