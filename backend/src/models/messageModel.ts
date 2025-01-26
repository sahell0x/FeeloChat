import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
 
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

        timestamp: {
            type: Date,
            default: Date.now, 
        },

        // isRead: {
        },
       //     type: Boolean,
        //     default: false,
        // },

        // isDelivered: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;