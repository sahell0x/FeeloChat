import { Socket } from "socket.io";

const connection = (socket:Socket, userMap:Map<string,string>):void=>{
   const userId = socket.handshake.query.userId as string;

   if(userId){
      userMap.set(userId,socket.id);
   }
} 

export default connection;