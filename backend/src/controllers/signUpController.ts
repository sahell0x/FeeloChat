import jwt from "jsonwebtoken";
import User from "../models/userModel";
import {StatusCode} from "status-code-enum";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";

dotenv.config();

const secrete:string = process.env.SECRETE as string;

const signUpController = async (req: Request,res:Response)=>{
    console.log("inside signup");
    
    try{
        const body = req.body;
       const isUserAlreadyExist = await User.findOne({email:body.email});

       if(isUserAlreadyExist){
        return res.status(409).json({error: "user aleady exist"});
       }
       body.password = await bcrypt.hash(body.password,13);

        const user = await User.create(body);
        const token = jwt.sign({email:user.email,id:user._id},secrete);

        res.cookie('token', token, {     //set cookie
            httpOnly: true,
            sameSite: 'strict',
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days max age;
          });

        return res.status(StatusCode.SuccessCreated).json({
            message:"User created successfully",
            email:user.email,
            id:user._id,
           
        });

    }catch(e){
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        console.log(e.message);
    }
}

export default signUpController;