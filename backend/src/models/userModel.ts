import mongoose from "mongoose";

//user model defination

const userSchem = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  publicKey:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: false,  //to allow create guest acount for user acount it will get verifiend by middleware.
  },
  firstName: {
    type: String,
    required: false,
    default:"",
  },
  lastName: {
    type: String,
    required: false,
    default:"",
  },
  img:{ type: String, required: false ,default:""},
  
  profileSetup: { type: Boolean, required: false, default:false },
  isGuest: { type: Boolean, required: false, default:false },

});

const User = mongoose.model("User", userSchem);

export default User;
