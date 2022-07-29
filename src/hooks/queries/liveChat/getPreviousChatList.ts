import { Socket } from "socket.io-client";

export const getPreviousChatList = (socketQueryData: any, socket?: Socket) => {
  try {
    if (!socket) throw Error("socket unconnected");
    socket.emit("getPreviousChatList", socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
