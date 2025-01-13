"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signUptypes_js_1 = __importDefault(require("../types/signUptypes.js"));
const status_code_enum_1 = require("status-code-enum");
const signUpMiddleware = (req, res, next) => {
    console.log("inside middleware");
    const body = req.body;
    const { success } = signUptypes_js_1.default.safeParse(body);
    if (!success) {
        return res.status(status_code_enum_1.StatusCode.ClientErrorBadRequest).json({
            message: "Invalid inputs",
        });
    }
    next();
};
exports.default = signUpMiddleware;
