import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware";
import signUpController from "../controllers/signUpController";
import signInMiddleware from "../middlewares/signInMiddleware";
import signInController from "../controllers/signInController";
import authMiddleware from "../middlewares/authMiddleware";
import logOutController from "../controllers/logOutController";

//auth routes

const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

authRoutes.post("/signin",signInMiddleware,signInController);

authRoutes.post("/logout",authMiddleware,logOutController);


export default authRoutes;