import { io, Socket } from "socket.io-client";

interface SocketInstanceParams {
  setIsConnected?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const socketInstance = ({
  setIsConnected,
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
      if (setIsConnected) setIsConnected(true);
    });

    return connectedSocket;
  } catch (error) {
    throw error;
  }
};
