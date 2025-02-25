import { StatusCode } from "status-code-enum";
import { Request, Response } from "express";
import type { UserId } from "../types/userTypes";
import Message from "../models/messageModel";

const getMessageController = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId: UserId = req.userId;
        const targetUserId = req.query._id;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = parseInt(req.query.skip as string) || 0;



        if (!userId || !targetUserId) {
            return res.status(StatusCode.ClientErrorBadRequest).json({
                message: "Bad request.",
            });
        }

        const messages = await Message.find({
            $or: [
                { sender: userId, receiver: targetUserId },
                { receiver: userId, sender: targetUserId }
            ],
        })
        .sort({ timestamp: -1 }) 
        .skip(skip)
        .limit(limit);
        

        res.status(StatusCode.SuccessOK).json({
            messages: messages.reverse(),
            hasMore: messages.length === limit
        });

    } catch (error) {
        console.error("Error in getMessageController:", error);
        return res.status(StatusCode.ClientErrorNotFound).json({
            message: "Bad request.",
        });
    }
};

export default getMessageController;