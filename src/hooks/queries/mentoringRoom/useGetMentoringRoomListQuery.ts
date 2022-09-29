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

const getMentoringRoomList = async (
  params: ApiParams
): Promise<ApiResponse> => {
  const { data } = await axiosInstance().get<ApiResponse>(
    `/live-rooms?page=${params.page}&limit=${
      params.limit
    }&filter=${JSON.stringify(params.filter)}`
  );
  return data;
};

export const useGetMentoringRoomListQuery = (params: ApiParams) =>
  useQuery(["mentoringRoom", params], () => getMentoringRoomList(params));

export const useGetMentoringRoomQueryListINF = (params: ApiParams) =>
  useInfiniteQuery(
    ["mentoringRoom", params],
    ({ pageParam = 0 }) => {
      return getMentoringRoomList({ ...params, page: pageParam });
    },
    {
      getNextPageParam: (latestResponse) => latestResponse.nextPage,
    }
  );
