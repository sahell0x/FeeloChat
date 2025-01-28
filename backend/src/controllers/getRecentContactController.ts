import { StatusCode } from "status-code-enum";
import { Request, Response } from "express";
import type { UserId } from "../types/userTypes";
import Message from "../models/messageModel";
import mongoose from "mongoose";

const getRecentContactController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId:mongoose.Types.ObjectId  = new mongoose.Types.ObjectId(req.userId);

    console.log(userId);

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
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: "$contactId",
          lastMessageContent: { $first: "$content" },
          lastMessageSender: { $first: "$sender" },
          lastTimestamp: { $first: "$timestamp" },
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
          firstName:"$contact.firstName",
          lastName:"$contact.lastName",
          email:"$contact.email",
          img: "$contact.img",
          lastMessage: {
            $cond: {
              if: { $eq: ["$lastMessageSender", userId] },
              then: { $concat: ["You: ", "$lastMessageContent"] },
              else: "$lastMessageContent",
            },
          },
          timestamp: "$lastTimestamp",
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
