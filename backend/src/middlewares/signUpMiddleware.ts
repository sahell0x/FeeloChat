import signUptypes from "../types/signUptypes.js";
import {StatusCode} from "status-code-enum";


const signUpMiddleware = (req,res,next)=>{
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
