import signInTypes from "../zod-types/signInTypes.js";
import {StatusCode} from "status-code-enum";
import { Request,Response,NextFunction } from "express";


const signInMiddleware = (req:Request,res:Response,next:NextFunction):any=>{
    console.log("inside middleware");
   const body = req.body;
   const {success} = signInTypes.safeParse(body);

   if(!success){
     return res.status(StatusCode.ClientErrorBadRequest).json({
        message:"Invalid inputs",
     })
   }
   next();
}

export default signInMiddleware;
