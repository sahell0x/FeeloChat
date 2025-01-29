import jwt from "jsonwebtoken";
import User from "../models/userModel";
import {StatusCode} from "status-code-enum";
import dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";
import type { UserType } from "../types/userTypes";

import { compare } from "bcrypt";

dotenv.config();

const secrete :string= process.env.SECRETE as string;

//this controller handles user sign in

const signInController = async (req:Request,res:Response) :Promise<any> =>{
    console.log("inside signIn");
    const {email , password} = req.body;

    try{
        const user:UserType = await User.findOne({email});

        if(!user){

            return res.status(StatusCode.ClientErrorBadRequest).json({message:"Wrong email and password"});
        }
        
        //compare the user provide password with hashed password from the db

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            return res.status(StatusCode.ClientErrorBadRequest).json({message:"incorrect password"});
        }

        //create a jwt token to set cookie in user browser
        const token = jwt.sign({email:user.email,id:user._id},secrete);

        res.cookie('token', token, {     //set cookie
            httpOnly: true,
            sameSite: 'strict',
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days max age less token age cause Feelochat is privacy and security first;
          });

        return res.status(StatusCode.SuccessOK).json({
            message:"sign in successfully",
            email:user.email,
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            img:user.img,
            profileSetup:user.profileSetup,
        });

    }catch{
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        
    }
}

export default signInController;