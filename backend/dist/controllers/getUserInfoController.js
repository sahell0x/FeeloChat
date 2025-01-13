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
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const getUserInfoController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const userInfo = yield userModel_js_1.default.findOne({ _id: userId });
        if (!userInfo) {
            return res.status(status_code_enum_1.StatusCode.ClientErrorNotFound).json({
                message: "bad request user info not found",
            });
        }
        return res.status(status_code_enum_1.StatusCode.SuccessOK).json({
            id: userInfo._id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            img: userInfo.img,
            profileSetup: userInfo.profileSetup
        });
    }
    catch (_a) {
        return res.status(status_code_enum_1.StatusCode.ClientErrorNotFound).json({
            message: "bad request user info not found",
        });
    }
});
exports.default = getUserInfoController;
