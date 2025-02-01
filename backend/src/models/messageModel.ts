import mongoose from "mongoose";

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

        content: {
            type: String,
            required: true,
            trim: true, 
        },
        nonce:{
            type:String,
            required:true
        },

        timestamp: {
            type: Date,
            default: Date.now, 
        },

    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;