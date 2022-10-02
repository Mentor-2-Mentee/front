import { QueryClient } from "@tanstack/query-core";

export interface MentoringRoom {
  id: string;
  startedAt: string;
  createdAt: string;
  author: string;
  mentoringRoomTitle: string;
  mentoringRoomDescription: string;
  imageFiles: string[];
  roomTags?: string[];
  roomFilterTag: string;
}

export const mentoringRoomQueryClient = new QueryClient();

export * from "./usePostMentoringRoomMutation";
export * from "./useGetMentoringRoomListQuery";
