import { Socket } from "socket.io";

const connection = (socket:Socket, userMap:Map<string,string>):void=>{
   const userId = socket.handshake.query.userId as string;

   if(userId){
      userMap.set(userId,socket.id);
      console.log(`user with id ${userId} is connected with socket id ${socket.id}`)
   }else{
        console.log("user id is not provided during connection");
   }
} 

export default connection;