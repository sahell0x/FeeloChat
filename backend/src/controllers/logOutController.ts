import {StatusCode} from "status-code-enum";
import profileNameTypes from "../zod-types/profileNameTypes.js";
import User from "../models/userModel.js";
import { Request,Response } from "express";
import { UserId, UserType } from "../types/userTypes.js";

//this controller simply sets a empty cookie in user browser which makes user logout completly 

const logOutController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        
        res.cookie("token","", {     
            httpOnly: true,
            sameSite: "strict",
            // secure: true,
            maxAge: 1,   
        });
    return res.status(StatusCode.SuccessOK).json({
        message:"Logout successfully",
    });

   
    }catch{
     return res.status(StatusCode.ServerErrorInternal).json({message:"internal server error."});
    }
}

export default logOutController;