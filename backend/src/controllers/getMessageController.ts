import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";
import type { UserId } from "../types/userTypes";
import Message from "../models/messageModel";
import { timeStamp } from "console";

const getMessageController = async (req :Request,res :Response) :Promise<any>=>{
    try{
        const userId : UserId = req.userId;
        const targetUserId  = req.query._id;

        if(!userId || !targetUserId ){
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message:"Bad request.",
            });
        }

        const resposnse = await Message.find({
            $or: [
                {sender:userId,receiver:targetUserId},{receiver:userId,sender:targetUserId}
            ],
        }).sort({timestamp:1});

        res.status(StatusCode.SuccessOK).json({messages:resposnse});
       

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request.",
        })
    }
};

export default getMessageController;