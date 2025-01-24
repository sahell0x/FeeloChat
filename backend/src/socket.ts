import { Server } from "http";
import { Server as SocketServer} from "socket.io";

const socketSetup = (server:Server)=>{
   const io = new SocketServer(server, {
        cors:{
            origin: process.env.ORIGIN,
            methods:["GET","POST"],
            credentials:true,
        }
   });
}

export default socketSetup;