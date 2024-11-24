import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {StatusCode} from "status-code-enum";
import dotenv from "dotenv";
import { compare } from "bcrypt";
dotenv.config();

const secrete = process.env.SECRETE;

const signInController = async (req,res)=>{
    console.log("inside signIn");
    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){

            return res.status(StatusCode.ClientErrorBadRequest).json({message:"Wrong email and password"});
        }

        const isMatch = await compare(password, user.password);

        if(!isMatch){
            return res.status(StatusCode.ClientErrorBadRequest).json({message:"incorrect password"});
        }

        const token = jwt.sign({email:user.email,id:user._id},secrete);

        res.cookie('token', token, {     //set cookie
            httpOnly: true,
            sameSite: 'strict',
            secure:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 days max age;
          });

        return res.status(StatusCode.SuccessOK).json({
            message:"sign in successfully",
            email:user.email,
            id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            img:user.img
        });

    }catch(e){
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        console.log(e.message);
    }
}

export default signInController;