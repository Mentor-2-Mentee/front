import { io, Socket } from "socket.io-client";

export const socketInstance = (): Socket | undefined => {
  try {
    const connectedSocket = io(
      `${import.meta.env.VITE_APP_SOCKETURL}/live-chat`,
      // `${import.meta.env.VITE_APP_SOCKETURL}`,
      {
        path: "/socket/",
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
