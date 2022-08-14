import { Socket } from "socket.io-client";
import { CanvasToolOption } from "../../../pages/RoomPage/DrawArea";
import { Stroke } from "../../../pages/RoomPage/DrawArea/Canvas";

export interface EmitStrokeParams {
  stroke: Stroke;
  canvasToolOption: CanvasToolOption;
  userId?: string;
  roomId?: string;
}

export const emitStroke = (params: EmitStrokeParams, socket: Socket) => {
  try {
    if (!socket.connected) throw Error("socket unconnected");
    socket.emit(`mentoringRoom_canvas_stroke_live`, params);
  } catch (error) {
    console.log(error);
  }
};
