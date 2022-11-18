import { io, Socket } from "socket.io-client";

interface SocketInstanceParams {}

export const socketInstance = ({}: SocketInstanceParams): Socket => {
  const socket = io(`${import.meta.env.VITE_APP_SOCKETURL}/live-contents`, {
    path: "/websocket/",
    transports: ["websocket"],
  });

  return socket;
};
