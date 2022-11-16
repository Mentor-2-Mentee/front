import { useQuery } from "@tanstack/react-query";
import { Chat } from "../../../commonElements/LiveChat";

export const useGetChatListQuery = (examReviewRoomId: number) =>
  useQuery<Chat[]>(["examReviewRoom", "chatList", examReviewRoomId], {
    initialData: [],
  });
