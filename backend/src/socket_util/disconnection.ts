import { Socket } from "socket.io";
import onlineStatusProvider from "./onlineStatusProvider";

//this func handles user disconnection and menage map with user id and user socket id removes user id from the map.


const disconnection = (socket:any , userMap: Map<string,string>,io:any):void=> {

     const IS_USER_ONLINE = false;  //disconnection frame 


     const userId = socket.handshake.query.userId as string;     
     if(userId){
        onlineStatusProvider(userId,io,userMap,IS_USER_ONLINE);
        userMap.delete(userId);
        
     }       
           
}

export default disconnection;