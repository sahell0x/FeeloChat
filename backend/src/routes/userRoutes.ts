import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import getUserInfoController from "../controllers/getUserInfoController.js";
import updateUserProfileController from "../controllers/updateUserProfileController.js";
import userProfileUploadAndDeleteController from "../controllers/userProfile-upload-and-delete-controller.js";

const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController);

userRoutes.patch("/user",authMiddleware,updateUserProfileController);

userRoutes.patch("/user/profile",authMiddleware,userProfileUploadAndDeleteController);


export default userRoutes;