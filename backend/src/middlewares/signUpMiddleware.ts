import signUptypes from "../zod-types/signUptypes.js";
import {StatusCode} from "status-code-enum";
import { Request,Response,NextFunction } from "express";



const signUpMiddleware = (req:Request,res:Response,next:NextFunction):any=>{
    console.log("inside middleware");
   const body = req.body;
   const {success} = signUptypes.safeParse(body);

   if(!success){
     return res.status(StatusCode.ClientErrorBadRequest).json({
        message:"Invalid inputs",
     })
   }
   next();
}

export default signUpMiddleware;
