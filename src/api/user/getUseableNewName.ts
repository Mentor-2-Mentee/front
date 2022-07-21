import axiosInstance from "../axiosInstance";

interface GetUseableNewNameResponseParams {
  message: string;
  canUse: boolean;
}

export const getUseableNewName = async (
  newName: string
): Promise<GetUseableNewNameResponseParams> => {
  try {
    const response = await axiosInstance().get(
      `/oauth/name_check?newname=${newName}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`getUseableNewName failed by ${error}`);
  }
};
