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

// This controller is responsible for handling sign-up requests
const signUpController = async (req: Request, res: Response): Promise<any> => {
    console.log("inside signup");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const body = req.body;


        // Check if this email is already used
        const isUserAlreadyExist = await User.findOne({ email: body.email }).session(session);

        if (isUserAlreadyExist) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Hash user password before storing it into the database
        body.password = await bcrypt.hash(body.password, 13);

        const userData = {
            email: body.email,
            password: body.password,
            publicKey: body.publicKey,
        };

        // Create user with session
        const user: any = await User.create([userData], { session });

        const privateKeyData = {
            userId: user[0]._id,
            ...body.encryptedPrivateKeyData,
        };

        // Create private key with session
        const privateKeyResponse = await Key.create([privateKeyData], { session });


        if (user && privateKeyResponse) {
            // If both user and private key are created successfully, commit the transaction
            await session.commitTransaction();

            const token = jwt.sign({ email: user[0].email, id: user[0]._id }, secret);

            res.cookie("token", token, {     // Set cookie
                httpOnly: true,
                sameSite: "strict",
                secure: true,
                maxAge: 30 * 24 * 60 * 60 * 1000,   // 7 days max age
            });

            return res.status(StatusCode.SuccessCreated).json({
                email: user[0].email,
                id: user[0]._id,
                publicKey:user[0].publicKey,
                isGuest:user[0].isGuest,
            });
        }

        // If either operation fails, abort the transaction
        throw new Error("Failed to create user or private key");

    } catch (error) {
        // Abort the transaction if anything goes wrong
        await session.abortTransaction();
        console.error("Transaction failed:", error);

        return res.status(StatusCode.ServerErrorInternal).json({
            message: "Internal server error",
        });
    } finally {
        // End the session
        session.endSession();
    }
};

export default signUpController;
