import jwt from "jsonwebtoken";
import {StatusCode} from "status-code-enum";
import { Request,Response,NextFunction } from "express";


const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
   const token = req.cookies.token;
   if(!token){
    return res.status(StatusCode.ClientErrorUnauthorized).json({message:"access denield unauthrized client"});
   }

   try{

    const secrete = process.env.SECRETE;

    const result = jwt.verify(token,secrete);
    if(!result.id){
        return res.status(StatusCode.ClientErrorUnauthorized).json({message:"access denield unauthrized client"});
    }

    req.userId = result.id;

    return next();

   }catch{
    return res.status(StatusCode.ClientErrorUnauthorized).json({message:"access denield unauthrized client"});
   }
}

export default authMiddleware;