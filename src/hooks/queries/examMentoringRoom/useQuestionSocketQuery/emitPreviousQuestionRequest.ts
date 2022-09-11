import { Socket } from "socket.io-client";

export const emitPreviousQuestionRequest = (data: any, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconneced");
    socket.emit("examMentoringRoom_question_prev", data);
  } catch (error) {
    console.log(error);
  }
};
