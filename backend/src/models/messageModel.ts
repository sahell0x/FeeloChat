import mongoose from "mongoose";
import { boolean } from "zod";

//message schema defination

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },

        cipherTextForSender: {
            type: String,
            required: true,
        },
        cipherTextForReceiver: {
            type: String,
            required: true,
        },
        nonce:{
            type:String,
            required:true
        },

        timestamp: {
            type: Date,
            default: Date.now, 
        },
        isRead : {
            type: Boolean,
            default:false,
        }

    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;