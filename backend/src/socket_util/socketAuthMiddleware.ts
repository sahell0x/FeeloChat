import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

const socketAuthMiddleware = (socket: Socket, next: (err?: Error) => void) => {
    try {
        const secrete = process.env.SECRETE as string;
        const cookies = socket.handshake.headers.cookie;
        if (!cookies){
             throw new Error("No cookies found");
            }

        const token = cookies.split("token=")[1];

        if (!token) 
        {
            throw new Error("Token not found");
        }

        const decoded:any = jwt.verify(token,secrete);

        
       if(decoded.id){

        (socket as any).userId = (decoded as any).id;

        console.log("Authenticated User:", (socket as any).userId);
        next(); 
       }else{
        next(new Error("Authentication error"));

       }


    } catch (error:any) {
        console.log("Socket authentication failed:", error.message);
        next(new Error("Authentication error"));
    }
};

export default socketAuthMiddleware;