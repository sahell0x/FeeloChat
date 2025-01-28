import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 

  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
