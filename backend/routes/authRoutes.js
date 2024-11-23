import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware.js";
import signUpController from "../controllers/signUpController.js";


const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

export default authRoutes;