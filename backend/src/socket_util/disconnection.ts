import { Socket } from "socket.io";

const disconnection = (socket:Socket , userMap: Map<string,string>):void=> {
     console.log(`client disconnected ${socket.id}`);

     for(const [userId,socketId] of userMap.entries()){
        if(socketId === socket.id){
            userMap.delete(userId);
            break;
        }
     }
}

export default disconnection;