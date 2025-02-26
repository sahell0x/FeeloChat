import mongoose from "mongoose";


const guestDeviceFingerPrintSchema = new mongoose.Schema(
   {
    userDeviceFingerPrint: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 604800 },
   }
);

const GuestDeviceFingerPrint = mongoose.model('GuestIP', guestDeviceFingerPrintSchema);

export default GuestDeviceFingerPrint;