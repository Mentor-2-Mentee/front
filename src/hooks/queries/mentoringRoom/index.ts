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

export * from "./usePostMentoringRoomMutation";
export * from "./useGetMentoringRoomListQuery";
