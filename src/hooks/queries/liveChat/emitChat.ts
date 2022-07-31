import { Socket } from "socket.io-client";
import { ChatElement } from "../../../pages/RoomPage/LiveChat/LiveChatElement";

export const emitChat = (
  socketQueryData: ChatElement,
  socket?: React.MutableRefObject<Socket | undefined>
) => {
  try {
    if (!socket?.current) throw Error("socket unconnected");
    socket.current.emit(`chatToServer`, socketQueryData);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
