import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import getUserInfoController from "../controllers/getUserInfoController";
import updateUserProfileController from "../controllers/updateUserProfileController";
import userProfileUploadAndDeleteController from "../controllers/userProfile-upload-and-delete-controller";

const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController);

userRoutes.patch("/user",authMiddleware,updateUserProfileController);

userRoutes.patch("/user/profile",authMiddleware,userProfileUploadAndDeleteController);


export default userRoutes;