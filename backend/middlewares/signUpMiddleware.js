import signUptypes from "../types/signUptypes";
import {StatusCode} from "status-code-enum";


const signUpMiddleware = (req,res,next)=>{
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
