import jwt from "jsonwebtoken";
import {StatusCode} from "status-code-enum";
import { Request,Response,NextFunction } from "express";

//Auth middleware handles authentication of all incoming requests and pass UserId further

const authMiddleware = (req:Request,res:Response,next:NextFunction):any=>{
   const token = req.cookies.token;
   if(!token){
    return res.status(StatusCode.ClientErrorUnauthorized).json({message:"access denield unauthrized client"});
   }

   try{

    const secrete:string = process.env.SECRETE as string;

    const result:any = jwt.verify(token,secrete);
    if(!result.id){
        return res.status(StatusCode.ClientErrorUnauthorized).json({message:"Unauthrized client"});
    }

    req.userId = result.id;

    return next();

   }catch{
    return res.status(StatusCode.ClientErrorUnauthorized).json({message:"Unauthrized client"});
   }
}

export default authMiddleware;