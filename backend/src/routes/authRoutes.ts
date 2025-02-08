import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware";
import signUpController from "../controllers/signUpController";
import signInMiddleware from "../middlewares/signInMiddleware";
import signInController from "../controllers/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import logOutController from "../controllers/logOutController";
import sendOTP from "../utils/emailService";
import guestAcountController from "../controllers/guestAcountController";

//auth routes

const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

authRoutes.post("/signin",signInMiddleware,signInController);

authRoutes.post("/logout",authMiddleware,logOutController);

authRoutes.post("/guest",guestAcountController);

authRoutes.post("/test",async(req,res)=>{
     try{
        await sendOTP("salinkhan304@gmail.com","111111");

        res.send("otp sent");
     }catch{
        res.send("unable to send otp");
     }
});


export default authRoutes;