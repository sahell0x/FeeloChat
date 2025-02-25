import {StatusCode} from "status-code-enum";
import { Request,Response } from "express";


const logOutController = async (req:Request,res:Response) :Promise<any>=>{
    try{
        
        res.cookie("token","", {     
            httpOnly: true,
            sameSite: "strict",
            secure: true,
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