import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export const emitChat = (chatData: ChatElement, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconnected");
    console.log("chatData", chatData);
    socket.emit(`mentoringRoom_chat_live`, chatData);
  } catch (error) {
    console.log(error);
  }
};
