import { Socket } from "socket.io-client";
interface SocketEmitData {
  userId?: string;
  examReviewRoomId?: number;
  timer?: number;
}

export const emitPreviousQuestionRequest = (
  data: SocketEmitData,
  socket: Socket
) => {
  try {
    if (!socket.connected) throw Error("socket unconneced");
    socket.emit("examReviewRoom_question_prev", data);
  } catch (error) {
    console.log(error);
  }
};
