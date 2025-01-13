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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const status_code_enum_1 = require("status-code-enum");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secrete = process.env.SECRETE;
const signUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("inside signup");
    try {
        const body = req.body;
        const isUserAlreadyExist = userModel_js_1.default.findOne({ email: body.email });
        if (isUserAlreadyExist) {
            return res.status(409).json({ error: "user aleady exist" });
        }
        body.password = yield bcrypt_1.default.hash(body.password, 13);
        const user = yield userModel_js_1.default.create(body);
        const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, secrete);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days max age;
        });
        return res.status(status_code_enum_1.StatusCode.SuccessCreated).json({
            message: "User created successfully",
            email: user.email,
            id: user._id,
        });
    }
    catch (e) {
        res.status(status_code_enum_1.StatusCode.ServerErrorInternal).json({
            message: "Internal server error"
        });
        console.log(e.message);
    }
});
exports.default = signUpController;
