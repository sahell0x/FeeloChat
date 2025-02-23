import { Socket } from "socket.io";
import onlineStatusProvider from "./onlineStatusProvider";

//this func handles user disconnection and menage map with user id and user socket id removes user id from the map.


const disconnection = (socket:Socket , userMap: Map<string,string>,io:any):void=> {

     const IS_USER_ONLINE = false;  //disconnection frame 


     const userId = (socket as any).userId;    

     console.log("disconected",userId);

      
     if(userId){
        userMap.delete(userId);
         setTimeout(()=>{
            onlineStatusProvider(userId,io,userMap,IS_USER_ONLINE);

         },3000);        
     }       
           
}

export default disconnection;