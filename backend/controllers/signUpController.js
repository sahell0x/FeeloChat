import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import {StatusCode} from "status-code-enum";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const secrete = process.env.SECRETE;

const signUpController = async (req,res)=>{
    console.log("inside signup");
    const body = req.body;
    body.password = await bcrypt.hash(body.password,13);
    try{
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