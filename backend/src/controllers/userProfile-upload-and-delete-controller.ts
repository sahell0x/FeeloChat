import {StatusCode} from "status-code-enum";
import User from "../models/userModel.js";
import { Request,Response,NextFunction } from "express";
import { UserId, UserType } from "../types/userTypes.js";



const userProfileUploadAndDeleteController = async (req:Request,res:Response):Promise<any> =>{
    try{
        const userId :UserId = req.userId;
    const userProfileImage = req.body;

    const response :UserType = await User.findOneAndUpdate({_id:userId},userProfileImage,{new:true});


    if(response){
        return res.status(StatusCode.SuccessAccepted).json({
            id:response._id,
           message:"image uploaded successfully.",
    
        });
    }
    
    return res.status(StatusCode.ClientErrorBadRequest).json({
        message:"bad request",
    });
    

    }catch{
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default userProfileUploadAndDeleteController;