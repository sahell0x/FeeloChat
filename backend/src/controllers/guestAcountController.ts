import jwt from "jsonwebtoken";
import { StatusCode } from "status-code-enum";
import User from "../models/userModel.js";
import { Request, Response } from "express";
import GuestIP from "../models/guestIPModel.js";
import dotenv from "dotenv";
import guestUUIDProvider from "../utils/guestUUiDProvider.js";
dotenv.config();

const guestAcountController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const IP = req.ip;
    const publicKey = req.body.publicKey;
    const secret = process.env.SECRET as string;

    if (!IP || !publicKey) {
       throw new Error("No IP or PublicKey");
    }

    const isIPExist = await GuestIP.findOne({ guestUserIP: IP });

    if (isIPExist) {
      return res.status(StatusCode.ClientErrorConflict).json({
        message: "Guest user for this IP already exist.",
      });
    }

    const response = await GuestIP.create({
      guestUserIP: IP,
    });

    if (!response) {
      throw new Error("DB opration failed");
    }

    const GuestUserData = {
        email : guestUUIDProvider(),
        publicKey:publicKey,
        isGuest : true,
        profileSetup:true,
    }

    const guestUser = await User.create(GuestUserData);

    if(!guestUser){
        throw new Error("Error while creating");
    }

   const token = jwt.sign({ email: guestUser.email, id: guestUser._id }, secret);

    res.cookie("token", token, {     
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,   
    });

    return res.status(StatusCode.SuccessCreated).json({
        email: guestUser.email,
        id: guestUser._id,
        publicKey:guestUser.publicKey,
        isGuest:guestUser.isGuest,
        profileSetup:guestUser.profileSetup,
    });

  } catch {
    res.status(StatusCode.ClientErrorBadRequest).json({
      message: "Bad request.",
    });
  }
};

export default guestAcountController;
