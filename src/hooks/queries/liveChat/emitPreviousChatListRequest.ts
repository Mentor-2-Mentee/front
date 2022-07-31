import { Socket } from "socket.io-client";
import { UseChatSocketQueryParams } from ".";

export interface GetPreviousChatListQueryParams
  extends Omit<UseChatSocketQueryParams, "socketRef"> {
  limit: number;
  targetTimeStamp: string | "latest";
}

export const emitPreviousChatListRequest = (
  socketQueryData: GetPreviousChatListQueryParams,
  socket?: React.MutableRefObject<Socket | undefined>
) => {
  try {
    if (!socket?.current) throw Error("socket unconnected");
    socket.current.emit("getPreviousChatList", socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
