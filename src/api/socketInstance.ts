import { io, Socket } from "socket.io-client";

interface SocketInstanceParams {
  instantlyEmitAction?: () => void;
}

export const socketInstance = ({
  instantlyEmitAction,
}: SocketInstanceParams): Socket => {
  try {
    const connectedSocket = io(
      `${import.meta.env.VITE_APP_SOCKETURL}/live-chat`,
      {
        path: "/websocket/",
        transports: ["websocket"],
      }
    );

    connectedSocket.on("connect", () => {
      console.log(`webSocket connected`);
      if (instantlyEmitAction) {
        instantlyEmitAction();
      }
    });

    return connectedSocket;
  } catch (error) {
    throw error;
  }
};
