import mongoose from "mongoose";


const encryptedKeySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        encryptedPrivateKey:{
            type:String,
            required:true,
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