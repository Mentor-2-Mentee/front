import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export const emitChat = (
  chatData: ChatElement,
  // socketRef: React.MutableRefObject<Socket | undefined>
  socket: Socket
) => {
  try {
    console.log("emitChat");
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit(`chatToServer`, chatData);
  } catch (error) {
    console.log(error);
  }
};
