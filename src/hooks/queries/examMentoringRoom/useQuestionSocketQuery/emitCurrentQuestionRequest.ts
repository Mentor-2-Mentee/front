import { Socket } from "socket.io-client";

export const emitCurrentQuestionRequest = (data: any, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconneced");
    socket.emit("examMentoringRoom_question_current", data);
  } catch (error) {
    console.log(error);
  }
};
