import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware";
import signUpController from "../controllers/signUpController";
import signInMiddleware from "../middlewares/signInMiddleware";
import signInController from "../controllers/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import logOutController from "../controllers/logOutController";
import guestAcountController from "../controllers/guestAcountController";
import verifyTOTPController from "../controllers/verifyTOTPController";
import sendTOTPController from "../controllers/sendTOTPCOntroller";
import ratelimiterForOTP from "../middlewares/rateLimiterForOTP";

//auth routes

const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

authRoutes.post("/signin",signInMiddleware,signInController);

authRoutes.post("/logout",authMiddleware,logOutController);

authRoutes.post("/guest",guestAcountController);

authRoutes.post("/send-otp",ratelimiterForOTP,sendTOTPController);

authRoutes.post("/verify-otp",verifyTOTPController);



export default authRoutes;