"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_js_1 = __importDefault(require("../middlewares/authMiddleware.js"));
const getUserInfoController_js_1 = __importDefault(require("../controllers/getUserInfoController.js"));
const updateUserProfileController_js_1 = __importDefault(require("../controllers/updateUserProfileController.js"));
const userProfile_upload_and_delete_controller_js_1 = __importDefault(require("../controllers/userProfile-upload-and-delete-controller.js"));
const userRoutes = (0, express_1.Router)();
userRoutes.get("/user", authMiddleware_js_1.default, getUserInfoController_js_1.default);
userRoutes.patch("/user", authMiddleware_js_1.default, updateUserProfileController_js_1.default);
userRoutes.patch("/user/profile", authMiddleware_js_1.default, userProfile_upload_and_delete_controller_js_1.default);
exports.default = userRoutes;
