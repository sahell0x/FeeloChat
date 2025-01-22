import {StatusCode} from "status-code-enum";
import profileNameTypes from "../zod-types/profileNameTypes.js";
import User from "../models/userModel.js";
import { Request,Response } from "express";
import { UserId, UserType } from "../types/userTypes.js";


const logOutController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        
        res.cookie("token","",{maxAge:1,secure:true,sameSite:"none"});

    return res.status(StatusCode.SuccessOK).json({
        message:"Logout successfully",
    });

   
    }catch{
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default logOutController;