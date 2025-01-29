import jwt from "jsonwebtoken";
import User from "../models/userModel";
import {StatusCode} from "status-code-enum";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request,Response } from "express";

dotenv.config();

const secrete:string = process.env.SECRETE as string;

//this controller responsible to handle sign up requests

const signUpController = async (req: Request,res:Response):Promise<any> =>{
    console.log("inside signup");
    
    try{
        const body = req.body;

        //check is this email already used or not
       const isUserAlreadyExist = await User.findOne({email:body.email});

       if(isUserAlreadyExist){
        return res.status(409).json({error: "user aleady exist"});
       }

       //hash user password before storing into database

       body.password = await bcrypt.hash(body.password,13);

        const user:any = await User.create(body);

        if(user){
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

      

        }

        return res.status(StatusCode.ClientErrorBadRequest).json({
            message:"unable to create user",
        });
    }catch{
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        
    }
}

export default signUpController;