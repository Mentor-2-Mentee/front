import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { ExamSchedule } from ".";

interface DeleteExamScheduleParams
  extends Pick<ExamSchedule, "examScheduleId"> {
  token: string;
}

export const deleteExamSchedule = async (
  params: DeleteExamScheduleParams
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).delete(
      `/examSchedule?examScheduleId=${params.examScheduleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`deleteExamSchedule failed by ${error}`);
  }
};
