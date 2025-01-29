import { Socket } from "socket.io";

//this func handles user disconnection and menage map with user id and user socket id removes user id from the map.


const disconnection = (socket:Socket , userMap: Map<string,string>,io:any):void=> {
     console.log(`client disconnected ${socket.id}`);

     const userId = socket.handshake.query.userId as string;     
     if(userId){
        userMap.delete(userId);
        
     }       
           
}

export default disconnection;