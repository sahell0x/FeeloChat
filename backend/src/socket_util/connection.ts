import { Socket } from "socket.io";
import onlineStatusProvider from "./onlineStatusProvider";

//this func handles user connection and menage map with user id and user socket id adds id into the map.

const connection = (socket:Socket, userMap:Map<string,string>,io:any):void=>{
   const IS_USER_ONLINE = true; //connection frame
   const userId = socket.handshake.query.userId as string;

   onlineStatusProvider(userId,io,userMap,IS_USER_ONLINE);

   if(userId){
      userMap.set(userId,socket.id);
   }
} 

export default connection;