import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import getUserInfoController from "../controllers/getUserInfoController.js";
import updateUserProfileController from "../controllers/updateUserProfileController.js";
import uploadUserProfileController from "../controllers/uploadUserProfileController.js";

const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController);

userRoutes.patch("/user",authMiddleware,updateUserProfileController);

userRoutes.patch("/user/profile",authMiddleware,uploadUserProfileController);


export default userRoutes;