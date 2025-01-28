import { Socket } from "socket.io";

const disconnection = (socket:Socket , userMap: Map<string,string>):void=> {
     console.log(`client disconnected ${socket.id}`);

     const userId = socket.handshake.query.userId as string;     
     if(userId){
        userMap.delete(userId);
        
     }       
           
}

export default disconnection;