import { AxiosRequestConfig } from "axios";
import axiosInstance from "../../../api/axiosInstance";
import { TestSchedule } from ".";

interface DeleteTestScheduleParams
  extends Pick<TestSchedule, "testScheduleId"> {
  token: string;
}

export const deleteTestSchedule = async (
  params: DeleteTestScheduleParams
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${params.token}`,
    },
  };
  try {
    const response = await axiosInstance(config).delete(
      `/testSchedule?testScheduleId=${params.testScheduleId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`deleteTestSchedule failed by ${error}`);
  }
};
