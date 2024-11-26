import {StatusCode} from "status-code-enum";
import User from "../models/userModel.js";

const getUserInfoController = async (req,res)=>{
    try{
        const userId = req.userId;

        const userInfo = await User.findOne({_id:userId});
        console.log(userInfo);
        if(!userInfo){
            return res.status(StatusCode.ClientErrorNotFound).json({
                message:"bad request user info not found",
            }); 
        }

        return res.status(StatusCode.SuccessOK).json({
            id:userInfo._id,
            email:userInfo.email,
            firstName:userInfo.firstName,
            lastName:userInfo.lastName,
            profileSetup:userInfo.profileSetup
        });

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request user info not found",
        })
    }
};

export default getUserInfoController;