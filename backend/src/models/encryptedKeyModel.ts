import mongoose from "mongoose";
import { string } from "zod";

//model of encrypted keys which are the encrypted private keys encrypted from dirived password of user.

const encryptedKeySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },

        nonce: {
            type: String,
            required: true,
        },  
       
    }
);

const Key = mongoose.model('Key', encryptedKeySchema);

export default Key;