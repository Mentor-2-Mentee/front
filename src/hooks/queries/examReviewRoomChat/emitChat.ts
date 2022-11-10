import { Socket } from "socket.io-client";

export const emitChat = (chatData: any, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit(`examReviewRoom_chat_live`, chatData);
  } catch (error) {
    console.log(error);
  }
};
