import { Socket } from "socket.io-client";
import { UseChatSocketQueryParams } from ".";

export interface GetPreviousChatListQueryParams
  extends Omit<UseChatSocketQueryParams, "socketRef"> {
  limit: number;
  targetTimeStamp: string | "latest";
  sendTime: number;
}

export const emitPreviousChatListRequest = (
  socketQueryData: GetPreviousChatListQueryParams,
  // socketRef: React.MutableRefObject<Socket | undefined>
  socket: Socket
) => {
  try {
    console.log("emitPreviousChatListRequest");
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit("getPreviousChatList", socketQueryData);
  } catch (error) {
    console.log(error);
  }
};
