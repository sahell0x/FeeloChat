import { NextFunction, Request, Response } from 'express';
import speakeasy from "speakeasy";
 
 const verifyTOTPMiddleware   =  (req:Request, res:Response , next : NextFunction):any => {

    try{
        const { otp, secret } = req.body;
        if ( !otp || !secret) return res.status(400).json({ message: "Missing fields" });
      
        
        // Verify OTP
        const isValid = speakeasy.totp.verify({
          secret,
          encoding: "base32",
          token: otp,
          step:120,
          window: 1, // Allow small time drift
        });
      
        if (!isValid) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        next();

    }catch(e:any){
        console.log(e.message);
        return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  }

  export default verifyTOTPMiddleware;