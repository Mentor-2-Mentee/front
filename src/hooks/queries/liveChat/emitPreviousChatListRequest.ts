import { Socket } from "socket.io-client";
import { UseChatSocketQueryParams } from ".";

export interface GetPreviousChatListQueryParams
  extends Omit<UseChatSocketQueryParams, "socketRef"> {
  limit: number;
  targetIndex: number;
}

export const emitPreviousChatListRequest = (
  socketQueryData: GetPreviousChatListQueryParams,
  socket?: Socket
) => {
  try {
    if (!socket) throw Error("socket unconnected");
    socket.emit("getPreviousChatList", socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
