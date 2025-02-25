import { NextFunction, Request, Response } from "express";
import speakeasy from "speakeasy";
import StatusCode from "status-code-enum";

const verifyTOTPMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  try {
    const { otp, secret } = req.body;
    if (!otp || !secret)
      return res.status(400).json({ message: "Missing fields" });

    const isValid = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token: otp,
      step: 60,
      window: 1,
    });

    if (!isValid) {
      return res
        .status(StatusCode.ClientErrorUnauthorized)
        .json({ success: false, message: "Invalid OTP" });
    }

    next();
  } catch (e: any) {
    return res
      .status(StatusCode.ClientErrorUnauthorized)
      .json({ success: false, message: "Invalid OTP" });
  }
};

export default verifyTOTPMiddleware;
