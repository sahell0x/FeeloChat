import { StatusCode } from "status-code-enum";
import { Request, Response } from "express";
import type { UserId } from "../types/userTypes";
import Message from "../models/messageModel";
import mongoose from "mongoose";

//this controller provides all recent contacts for current user

const getRecentContactController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId:mongoose.Types.ObjectId  = new mongoose.Types.ObjectId(req.userId);

    const Recentcontacts = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: userId }, { receiver: userId }],
        },
      },
      {
        $addFields: {
          contactId: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$receiver",
              else: "$sender",
            },
          },
          cipherText: {
            $cond: {
              if: { $eq: ["$sender", userId] },
              then: "$cipherTextForSender",
              else: "$cipherTextForReceiver",
            },
          },
          nonce: "$nonce",
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: "$contactId",
          lastMessageContent: { $first: "$cipherText" }, 
          lastMessageSender: { $first: "$sender" },
          lastMessageNonce: { $first: "$nonce" }, 
          lastTimestamp: { $first: "$timestamp" },
          isSent: { $first: { $eq: ["$sender", userId] } },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "contact",
        },
      },
      {
        $unwind: "$contact",
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          firstName: "$contact.firstName",
          lastName: "$contact.lastName",
          email: "$contact.email",
          img: "$contact.img",
          publicKey: "$contact.publicKey",
          lastMessage: "$lastMessageContent",
          nonce: "$lastMessageNonce",
          timestamp: "$lastTimestamp",
          isSent: 1,
          isGuest: "$contact.isGuest",
        },
      },
      {
        $sort: { timestamp: -1 },
      },
    ]);



     return res.status(StatusCode.SuccessOK).json({
        Recentcontacts,
     });


  } catch {
    return res.status(StatusCode.ClientErrorNotFound).json({
      message: "bad request.",
    });
  }
};

export default getRecentContactController;
