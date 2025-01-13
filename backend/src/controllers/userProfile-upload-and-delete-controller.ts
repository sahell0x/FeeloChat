import {StatusCode} from "status-code-enum";
import User from "../models/userModel.js";
import { Request,Response,NextFunction } from "express";


const userProfileUploadAndDeleteController = async (req:Request,res:Response)=>{
    try{
        const userId = req.userId;
    const userProfileImage = req.body;

    const response = await User.findOneAndUpdate({_id:userId},userProfileImage,{new:true});



    return res.status(StatusCode.SuccessAccepted).json({
        id:response._id,
       message:"image uploaded successfully.",

    });

    }catch{
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default userProfileUploadAndDeleteController;