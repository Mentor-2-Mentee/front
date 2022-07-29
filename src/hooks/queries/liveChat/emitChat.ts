import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export const emitChat = (socketQueryData: ChatElement, socket?: Socket) => {
  try {
    if (!socket) throw Error("socket unconnected");
    socket.emit(`chatToServer`, socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
