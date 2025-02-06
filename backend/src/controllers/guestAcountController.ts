import {StatusCode} from "status-code-enum";
import profileNameTypes from "../zod-types/profileNameTypes.js";
import User from "../models/userModel.js";
import { Request,Response } from "express";
import { UserId, UserType } from "../types/userTypes.js";

//this controller simply sets a empty cookie in user browser which makes user logout completly 

const guestAcountController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        
        console.log(req.ip);
        res.send({
            message:"this is the success",
        });
    }catch{
    }
}

export default guestAcountController;