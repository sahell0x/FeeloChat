import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware";
import signUpController from "../controllers/signUpController";
import signInMiddleware from "../middlewares/signInMiddleware";
import signInController from "../controllers/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import logOutController from "../controllers/logOutController";
import guestAcountController from "../controllers/guestAcountController";
import sendTOTPController from "../controllers/sendTOTPCOntroller";
import ratelimiterForOTP from "../middlewares/rateLimiterForOTP";
import verifyTOTPMiddleware from "../middlewares/verifyTOTPMiddleware";
import guestMiddleware from "../middlewares/guestMiddleware";


const authRoutes = Router();

authRoutes.post("/signup",ratelimiterForOTP,verifyTOTPMiddleware,signUpMiddleware,signUpController);

authRoutes.post("/signin",ratelimiterForOTP,verifyTOTPMiddleware,signInMiddleware,signInController);

authRoutes.post("/logout",authMiddleware,logOutController);

authRoutes.post("/guest",guestMiddleware,guestAcountController);

authRoutes.post("/send-otp",sendTOTPController);




export default authRoutes;