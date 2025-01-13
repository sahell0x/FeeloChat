"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_enum_1 = require("status-code-enum");
const profileNameTypes_js_1 = __importDefault(require("../types/profileNameTypes.js"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const updateUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const userProfileData = req.body;
        const { success } = profileNameTypes_js_1.default.safeParse(userProfileData);
        if (!success) {
            return res.status(status_code_enum_1.StatusCode.ClientErrorBadRequest).json({
                message: "invalid inputs.",
            });
        }
        const response = yield userModel_js_1.default.findOneAndUpdate({ _id: userId }, Object.assign(Object.assign({}, userProfileData), { profileSetup: true }), { new: true });
        return res.status(status_code_enum_1.StatusCode.SuccessAccepted).json({
            email: response.email,
            firstName: response.firstName,
            lastName: response.lastName,
            id: response._id,
            profileSetup: response.profileSetup,
            img: response.img
        });
    }
    catch (_a) {
        return res.status(status_code_enum_1.StatusCode.ServerErrorInternal).json({ message: "internal server error." });
    }
});
exports.default = updateUserProfileController;
