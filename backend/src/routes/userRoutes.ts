import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import getUserInfoController from "../controllers/getUserInfoController";
import updateUserProfileController from "../controllers/updateUserProfileController";
import userProfileUploadAndDeleteController from "../controllers/userProfile-upload-and-delete-controller";
import searchContactController from "../controllers/searchContactController";
import getMessageController from "../controllers/getMessageController";

const userRoutes = Router();

userRoutes.get("/user",authMiddleware,getUserInfoController);

userRoutes.get("/user/search",authMiddleware,searchContactController);

userRoutes.get("/user/message",authMiddleware,getMessageController);


userRoutes.patch("/user",authMiddleware,updateUserProfileController);

userRoutes.patch("/user/profile",authMiddleware,userProfileUploadAndDeleteController);


export default userRoutes;