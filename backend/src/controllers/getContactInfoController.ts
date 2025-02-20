import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";


const getContactInfoController = async (req :Request,res :Response) :Promise<any>=>{
    try{
        const contactId = req.query.id;

        const contactInfo = await User.findOne({_id:contactId});
        if(!contactInfo){
            return res.status(StatusCode.ClientErrorNotFound).json({
                message:"bad request user info not found",
            }); 
        }

        return res.status(StatusCode.SuccessOK).json({
            id:contactInfo._id,
            email:contactInfo.email,
            firstName:contactInfo.firstName,
            lastName:contactInfo.lastName,
            img:contactInfo.img,
            publicKey:contactInfo.publicKey,
            isGuest:contactInfo.isGuest,
        });

    }catch(e){
        console.log(e);
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request user info not found",
        })
    }
};

export default getContactInfoController;