import {StatusCode} from "status-code-enum";
import profileNameTypes from "../zod-types/profileNameTypes.js";
import User from "../models/userModel.js";
import { Request,Response } from "express";
import { UserId, UserType } from "../types/userTypes.js";

//this controller handles user profile first name and last name updatetions 

const updateUserProfileController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        const userId :UserId = req.userId;
    const userProfileData = req.body;
    const {success} = profileNameTypes.safeParse(userProfileData);

    if(!success){
       return res.status(StatusCode.ClientErrorBadRequest).json({
            message:"invalid inputs.",
        });
    }
    const response:UserType = await User.findOneAndUpdate({_id:userId},{...userProfileData,profileSetup:true},{new:true});
    
    if(response){
        return res.status(StatusCode.SuccessAccepted).json({
            email : response.email,
           firstName: response.firstName,
           lastName : response.lastName,
           id : response._id,
           profileSetup:response.profileSetup,
           img:response.img,
           publicKey: response.publicKey,
        });
    
    }

    return res.status(StatusCode.ClientErrorBadRequest).json({
        message:"unable to update user info",
    })

   
    }catch{
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default updateUserProfileController;