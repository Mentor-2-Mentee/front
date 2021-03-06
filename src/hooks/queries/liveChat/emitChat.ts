import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export const emitChat = (chatData: ChatElement, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit(`chatToServer`, chatData);
  } catch (error) {
    console.log(error);
  }
};
