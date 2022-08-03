import { Socket } from "socket.io-client";
import { UseChatSocketQueryParams } from ".";

export interface GetPreviousChatListQueryParams
  extends UseChatSocketQueryParams {
  limit: number;
  targetTimeStamp: string | "latest";
  sendTime: number;
}

export const emitPreviousChatListRequest = (
  socketQueryData: GetPreviousChatListQueryParams,
  socket: Socket
) => {
  try {
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit("getPreviousChatList", socketQueryData);
  } catch (error) {
    console.log(error);
  }
};

export const emitInitialPreviousChatDataIntervalRequest = (
  socketRef: React.MutableRefObject<Socket | undefined>,
  socketQueryData: Omit<GetPreviousChatListQueryParams, "sendTime">
) => {
  const timer = window.setInterval(() => {
    socketRef.current?.emit("getPreviousChatList", {
      ...socketQueryData,
      sendTime: timer,
    });
  }, 500);
  return timer;
};
