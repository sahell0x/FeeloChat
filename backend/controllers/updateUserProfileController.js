import {StatusCode} from "status-code-enum";
import profileNameTypes from "../types/profileNameTypes.js";
import User from "../models/userModel.js";

const updateUserProfileController = async (req,res)=>{
    console.log("i got called");
    try{
        const userId = req.userId;
    const userProfileData = req.body;
    const {success} = profileNameTypes.safeParse(userProfileData);

    if(!success){
       return res.status(StatusCode.ClientErrorBadRequest).json({
            message:"invalid inputs.",
        });
    }
      console.log(userProfileData);
    const response = await User.findOneAndUpdate({_id:userId},{...userProfileData,profileSetup:true},{new:true});

    console.log(response);

    return res.status(StatusCode.SuccessAccepted).json({
        email : response.email,
       firstName: response.firstName,
       lastName : response.lastName,
       id : response._id,
       profileSetup:response.profileSetup,
    });

    }catch(e){
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default updateUserProfileController;