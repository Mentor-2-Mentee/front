import { FilterOption } from "../commonElements/FilterOptionHandler";
import { RoomParams } from "../commonElements/RoomList";
import axiosInstance from "./axiosInstance";

export interface GetLiveRoomListParams {
  filter: FilterOption;
  page: number;
  limit: number;
}

export interface GetLiveRoomListReaponse {
  data: RoomParams[];
  nextPage?: number;
}

export const getLiveRoomList = async ({
  filter,
  page,
  limit,
}: GetLiveRoomListParams): Promise<GetLiveRoomListReaponse> => {
  try {
    console.log("getLiveRoomList", page, limit);
    const response = await axiosInstance().get(
      `/live-rooms?page=${page}&limit=${limit}&filter=${JSON.stringify(filter)}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`getLiveRoomList failed by ${error}`);
  }
};
