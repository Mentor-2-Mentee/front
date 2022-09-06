import axiosInstance from "./axiosInstance";

export const getExamScheduleById = async (examScheduleId: number) => {
  try {
    const response = await axiosInstance().get(
      `/examSchedule/${examScheduleId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
