import { Socket } from "socket.io-client";

export interface EmitChatParams {
  examReviewRoomId: number;
  text: string;
  userId: string;
  imageUrlList?: string[];
}

export const emitChat = (params: EmitChatParams, socket: Socket) =>
  socket.emit(`examReviewRoom_chat_live`, params);
