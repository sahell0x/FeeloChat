import {StatusCode} from "status-code-enum";
import User from "../models/userModel";

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

        res.send(userInfo);

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request user info not found",
        })
    }
};

export default getUserInfoController;