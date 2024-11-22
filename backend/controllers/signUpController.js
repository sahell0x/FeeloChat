import jwt from "jsonwebtoken";
import User from "../models/userModel";
import {StatusCode} from "status-code-enum";
import bcrypt from "bcrypt";

const secrete = process.env.SECRETE;

const signUpController = async (req,res)=>{
    const body = req.body;
    body.password = await bcrypt.hash(body.password,13);
    try{
        const user = await User.create(body);
        const token = jwt.sign({email:user.email,id:user._id},secrete);
        return res.status(StatusCode.SuccessOK).json({
            message:"User created successfully",
            email:user.email,
            id:user._id,
            token:token
        });

    }catch(e){
        res.status(StatusCode.ServerErrorInternal).json({
            message:"Internal server error"
        });
        console.log(e.message);
    }
}

export default signUpController;