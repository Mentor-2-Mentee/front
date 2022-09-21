import axiosInstance from "./axiosInstance";

export const getExamScheduleById = async (examScheduleId: number) => {
  try {
    const response = await axiosInstance().get(
      `/examSchedule/${examScheduleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getExamScheduleById failed by ${error}`);
  }
};
