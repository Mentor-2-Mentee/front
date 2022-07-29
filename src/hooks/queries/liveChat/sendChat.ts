import { Socket } from "socket.io-client";

export const sendChat = (socketQueryData: any, socket?: Socket) => {
  try {
    if (!socket) throw Error("socket unconnected");
    socket.emit(`chatToServer`, socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
