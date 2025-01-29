import mongoose from "mongoose";
import Message from "../models/messageModel";

//this function gets user id's of contacts that will be used for online status updation

const getContacts = async (id: string) :Promise<string[]> => {
    const userId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);

    const response = await Message.aggregate([
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
            $match: { contactId: { $ne: null } } 
        },
        {
            $group: {
                _id: null,
                contactIds: { $addToSet: { $toString: "$contactId" } }, 
            },
        },
        {
            $project: {
                _id: 0,
                contactIds: 1,
            },
        },
    ]);

    const contactIds = response.length > 0 ? response[0].contactIds : [];

    
    return contactIds; 
};

export default getContacts;
