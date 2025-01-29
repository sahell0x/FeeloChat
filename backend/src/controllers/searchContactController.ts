import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";


//this controller provides contats for given  query 

const searchContactController = async (req :Request,res :Response) :Promise<any>=>{
    try{
        const searchQuery:any = req.query.query;
        
        if(searchQuery === undefined || searchQuery === null){
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message:"bad request",
            });
        }

        //regex to skip special characters
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
              }
        }) });
       

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request",
        })
    }
};

export default searchContactController;