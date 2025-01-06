import {StatusCode} from "status-code-enum";
import profileNameTypes from "../types/profileNameTypes.js";
import User from "../models/userModel.js";

const updateUserProfileController = async (req,res)=>{
    try{
        const userId = req.userId;
    const userProfileData = req.body;
    const {success} = profileNameTypes.safeParse(userProfileData);

    if(!success){
       return res.status(StatusCode.ClientErrorBadRequest).json({
            message:"invalid inputs.",
        });
    }
   
    const response = await User.findByIdAndUpdate(userId,{...userProfileData,profileSetup:true});

    return res.status(StatusCode.SuccessAccepted).json({
        message:"user profile updated successfully",
    });

    }catch(e){
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default updateUserProfileController;