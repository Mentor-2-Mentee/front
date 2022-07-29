import { io, Socket } from "socket.io-client";

interface SocketInstanceParams {
  setIsConnected?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const socketInstance = (): Socket => {
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
    });

    return connectedSocket;
  } catch (error) {
    throw error;
  }
};
