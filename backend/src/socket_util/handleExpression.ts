import { Server, Socket } from "socket.io";
import { ExpressionEventData } from "../types/socketTypes";

const handleExpression = (
    expressionEventData: ExpressionEventData,
  userSocketMap: Map<string, string>,
  socket: Socket,
  io: Server
) => {

  const contactId: string = expressionEventData.to;
  const userId = (socket as any).userId;
  const expression = expressionEventData.expression;
  const contactSocketId: string = userSocketMap.get(contactId) as string;

  const userSocketId: string = userSocketMap.get(userId) as string;

  if (contactSocketId && userSocketId) {


    const expressionData = {
        sender : userId,
        expression,
    }

    io.to(contactSocketId).emit("expression", expressionData);
  }
};

export default handleExpression;
