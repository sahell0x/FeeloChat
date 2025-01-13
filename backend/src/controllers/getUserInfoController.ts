import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";
import type { UserId } from "../types/userTypes";

const getUserInfoController = async (req :Request,res :Response)=>{
    try{
        const userId : UserId = req.userId;

        const userInfo = await User.findOne({_id:userId});
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
            img:userInfo.img,
            profileSetup:userInfo.profileSetup
        });

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request user info not found",
        })
    }
};

export default getUserInfoController;