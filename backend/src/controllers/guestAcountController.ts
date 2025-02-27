import { RecaptchaResponse } from "./../types/captchaTypes";
import jwt from "jsonwebtoken";
import { StatusCode } from "status-code-enum";
import User from "../models/userModel.js";
import { Request, Response } from "express";
import dotenv from "dotenv";
import guestUUIDProvider from "../utils/guestUUiDProvider.js";
import GuestDeviceFingerPrint from "../models/guestIPModel.js";
import axios from "axios";
dotenv.config();

const guestAcountController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { publicKey, deviceFingerPrint, captchaValue } = req.body;
    const secret = process.env.SECRET as string;
    const RECAPTCHA_SITE_SECRET = process.env.RECAPTCHA_SITE_SECRET as string;

    const reponseData: any = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SITE_SECRET}&response=${captchaValue}`
    );

    const data: RecaptchaResponse = reponseData.data;


    if (!data.success) {
      res.status(StatusCode.ClientErrorForbidden).json({
        message :" captcha varification failed",
      })
    }

    const isFingerPrintExist = await GuestDeviceFingerPrint.findOne({
      userDeviceFingerPrint: deviceFingerPrint,
    });

    if (isFingerPrintExist) {
      return res.status(StatusCode.ClientErrorConflict).json({
        message: "Guest user for this device finger print already exist.",
      });
    }

    const response = await GuestDeviceFingerPrint.create({
      userDeviceFingerPrint: deviceFingerPrint,
    });

    if (!response) {
      throw new Error("DB opration failed");
    }

    const GuestUserData = {
      email: guestUUIDProvider(),
      publicKey: publicKey,
      isGuest: true,
      profileSetup: true,
    };

    const guestUser = await User.create(GuestUserData);

    if (!guestUser) {
      throw new Error("Error while creating");
    }

    const token = jwt.sign(
      { email: guestUser.email, id: guestUser._id },
      secret
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(StatusCode.SuccessCreated).json({
      email: guestUser.email,
      id: guestUser._id,
      publicKey: guestUser.publicKey,
      isGuest: guestUser.isGuest,
      profileSetup: guestUser.profileSetup,
    });
  } catch {
    res.status(StatusCode.ClientErrorBadRequest).json({
      message: "Bad request.",
    });
  }
};

export default guestAcountController;
