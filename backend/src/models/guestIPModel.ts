import mongoose from "mongoose";


const guestIPSchema = new mongoose.Schema(
   {
    guestUserIP: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 604800 },
   }
);

const GuestIP = mongoose.model('GuestIP', guestIPSchema);

export default GuestIP;