import jwt from "jsonwebtoken";
import User from "../models/userModel";
import {StatusCode} from "status-code-enum";
import dotenv from "dotenv";
import { Request,Response } from "express";
import type { UserType } from "../types/userTypes";

import { compare } from "bcrypt";
import Key from "../models/encryptedKeyModel";

dotenv.config();

const secret :string= process.env.SECRET as string;


const signInController = async (req:Request,res:Response) :Promise<any> =>{
    console.log("inside signIn");
    const {email , password} = req.body;

    try{
        const user:UserType = await User.findOne({email});

        if(!user){

            return res.status(StatusCode.ClientErrorBadRequest).json({message:"Wrong email or password"});
        }
        

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            return res.status(StatusCode.ClientErrorBadRequest).json({message:"incorrect password"});
        }

        const token = jwt.sign({email:user.email,id:user._id},secret);

        const privateKeyResponse:any = await Key.findOne({userId:user._id});

        if(!privateKeyResponse){
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message:"bad request."
            });
        }

        res.cookie("token", token, {     
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,   
        });


          const userData = {
            email:user.email,
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            img:user.img,
            profileSetup:user.profileSetup,
            publicKey:user.publicKey,
            isGuest : user.isGuest,
          }

          const encryptedPrivateKeyData = {
            privateKey:privateKeyResponse.encryptedPrivateKey,
            salt:privateKeyResponse.salt,
            nonce:privateKeyResponse.nonce,
          }

        return res.status(StatusCode.SuccessOK).json({
            userData,
            encryptedPrivateKeyData,
        });

    }catch{
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        
    }
}

export default signInController;