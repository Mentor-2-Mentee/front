import { io, Socket } from "socket.io-client";

export const socketInstance = (): Socket | undefined => {
  try {
    const connectedSocket = io(
      `${import.meta.env.VITE_APP_SOCKETURL}:8083/live-chat`,
      // "wss://api.rudbeckiaz.com/live-chat",
      // "ws://localhost:8081/live-chat",
      {
        transports: ["websocket"],
      }
    );

    connectedSocket.on("connect", () => {
      console.log(`webSocket connected`);
    });

    return connectedSocket;
  } catch (error) {
    // throw new Error(error);
    return undefined;
  }
};
