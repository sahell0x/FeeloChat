import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import getUserInfoController from "../controllers/getUserInfoController";
import updateUserProfileController from "../controllers/updateUserProfileController";
import userProfileUploadAndDeleteController from "../controllers/userProfile-upload-and-delete-controller";
import searchContactController from "../controllers/searchContactController";
import getMessageController from "../controllers/getMessageController";
import getRecentContactController from "../controllers/getRecentContactController";
import getContactInfoController from "../controllers/getContactInfoController";

const userRoutes = Router();

//user routes

userRoutes.get("/user",authMiddleware,getUserInfoController);

userRoutes.get("/user/search",authMiddleware,searchContactController);

userRoutes.get("/user/message",authMiddleware,getMessageController);

userRoutes.get("/user/contact",authMiddleware,getRecentContactController);

userRoutes.get("/user/contact/info",authMiddleware,getContactInfoController);

userRoutes.patch("/user",authMiddleware,updateUserProfileController);

userRoutes.patch("/user/profile",authMiddleware,userProfileUploadAndDeleteController);


export default userRoutes;