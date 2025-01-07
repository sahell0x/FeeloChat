import {StatusCode} from "status-code-enum";
import User from "../models/userModel.js";

const userProfileUploadAndDeleteController = async (req,res)=>{
    try{
        const userId = req.userId;
    const userProfileImage = req.body;

    const response = await User.findOneAndUpdate({_id:userId},userProfileImage,{new:true});



    return res.status(StatusCode.SuccessAccepted).json({
        id:response._id,
       message:"image uploaded successfully.",

    });

    }catch(e){
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default userProfileUploadAndDeleteController;