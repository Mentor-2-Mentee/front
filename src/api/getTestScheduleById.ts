import axiosInstance from "./axiosInstance";

export const getTestScheduleById = async (testScheduleId: number) => {
  try {
    const response = await axiosInstance().get(
      `/testSchedule/${testScheduleId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
