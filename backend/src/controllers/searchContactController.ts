import {StatusCode} from "status-code-enum";
import User from "../models/userModel";
import { Request,Response } from "express";
import type { UserId } from "../types/userTypes";

const searchContactController = async (req :Request,res :Response) :Promise<any>=>{
    try{
        const searchQuery:any = req.query.query;
        
        if(searchQuery === undefined || searchQuery === null){
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message:"bad request",
            });
        }

        const extractedQuery:string = searchQuery.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

        console.log(extractedQuery)

        const regex = new RegExp(extractedQuery,"i");
        
        const response = await User.find({
            $and:[
                {_id : {$ne : req.userId}},
                {
                    $or : [{firstName : regex}, {lastName: regex}, {email : regex}]
                },
            ],
        });

        return res.status(200).json({response});
       

    }catch{
        return res.status(StatusCode.ClientErrorNotFound).json({
            message:"bad request",
        })
    }
};

export default searchContactController;