import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";



const searchContactController = async (req :Request,res :Response) :Promise<any>=>{
    try{
        const searchQuery:any = req.query.query;
        
        if(searchQuery === undefined || searchQuery === null){
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message:"bad request",
            });
        }

        const extractedQuery:string = searchQuery.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");


        const regex = new RegExp(extractedQuery,"i");
        
        const contacts = await User.find({
            $and:[
                {_id : {$ne : req.userId}},
                {
                    $or : [{firstName : regex}, {lastName: regex}, {email : regex}]
                },
            ],
        }).limit(20);

        return res.status(StatusCode.SuccessOK).json({ contacts:contacts.map((contact)=>{
              return {
                _id : contact._id,
                 email: contact.email,
                 firstName : contact.firstName,
                 lastName : contact.lastName,
                 img : contact.img,
                 publicKey : contact.publicKey,
                 isGuest:contact.isGuest,

              }
        }) });
       

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request",
        })
    }
};

export default searchContactController;