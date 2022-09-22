import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { MentoringRoom } from ".";
import axiosInstance from "../../../api/axiosInstance";
import { FilterOption } from "../../../commonElements/FilterOptionHandler";

interface ApiParams {
  filter: FilterOption;
  page: number;
  limit: number;
}

interface ApiResponse {
  mentoringRoomList: MentoringRoom[];
  nextPage?: number;
}

const getMentoringRoom = async (params: ApiParams): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/live-rooms?page=${params.page}&limit=${
      params.limit
    }&filter=${JSON.stringify(params.filter)}`
  );
  return data;
};

export const useGetMentoringRoomQuery = (params: ApiParams) =>
  useQuery(["mentoringRoom", params], () => getMentoringRoom(params));

export const useGetMentoringRoomQueryINF = (params: ApiParams) =>
  useInfiniteQuery(
    ["mentoringRoom", params],
    ({ pageParam = 0 }) => {
      return getMentoringRoom({ ...params, page: pageParam });
    },
    {
      getNextPageParam: (latestResponse) => latestResponse.nextPage,
    }
  );
