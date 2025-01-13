import signInTypes from "../types/signInTypes.js";
import {StatusCode} from "status-code-enum";


const signInMiddleware = (req,res,next)=>{
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
