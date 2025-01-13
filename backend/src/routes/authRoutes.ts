import { Router } from "express";
import signUpMiddleware from "../middlewares/signUpMiddleware";
import signUpController from "../controllers/signUpController";
import signInMiddleware from "../middlewares/signInMiddleware";
import signInController from "../controllers/signInController";

const authRoutes = Router();

authRoutes.post("/signup",signUpMiddleware,signUpController);

authRoutes.post("/signin",signInMiddleware,signInController);

export default authRoutes;