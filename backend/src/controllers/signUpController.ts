import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { StatusCode } from "status-code-enum";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Request, Response } from "express";
import Key from "../models/encryptedKeyModel";
import mongoose from "mongoose";

dotenv.config();

const secret: string = process.env.SECRET as string;

const signUpController = async (req: Request, res: Response): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const body = req.body;

    const isUserAlreadyExist = await User.findOne({
      email: body.email,
    }).session(session);

    if (isUserAlreadyExist) {
      return res
        .status(StatusCode.ClientErrorConflict)
        .json({ error: "User already exists" });
    }

    body.password = await bcrypt.hash(body.password, 13);

    const userData = {
      email: body.email,
      password: body.password,
      publicKey: body.publicKey,
    };

    const user: any = await User.create([userData], { session });

    const privateKeyData = {
      userId: user[0]._id,
      ...body.encryptedPrivateKeyData,
    };

    const privateKeyResponse = await Key.create([privateKeyData], { session });

    if (user && privateKeyResponse) {
      await session.commitTransaction();

      const token = jwt.sign({ email: user[0].email, id: user[0]._id }, secret);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(StatusCode.SuccessCreated).json({
        email: user[0].email,
        id: user[0]._id,
        publicKey: user[0].publicKey,
        isGuest: user[0].isGuest,
      });
    }

    throw new Error("Failed to create user or private key");
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction failed:", error);

    return res.status(StatusCode.ServerErrorInternal).json({
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};

export default signUpController;
