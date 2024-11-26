import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware.js";
import signUpController from "../controllers/signUpController.js";
import signInMiddleware from "../middlewares/signInMiddleware.js";
import signInController from "../controllers/signInController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

authRoutes.post("/signin",signInMiddleware,signInController);

authRoutes.get("/user",authMiddleware,);


export default authRoutes;