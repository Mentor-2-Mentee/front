import { io, Socket } from "socket.io-client";

const PORT = 443;
export const socketInstance = (): Socket | undefined => {
  try {
    const connectedSocket = io(
      `${import.meta.env.VITE_APP_SOCKETURL}:${PORT}/live-chat`,
      // "ws://localhost:443/chats",
      {
        transports: ["websocket"],
      }
    );

    connectedSocket.on("connect", () => {
      console.log(`webSocket connected at PORT ${PORT}`);
    });

    return connectedSocket;
  } catch (error) {
    // throw new Error(error);
    return undefined;
  }
};
