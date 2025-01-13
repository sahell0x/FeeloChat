"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_code_enum_1 = require("status-code-enum");
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(status_code_enum_1.StatusCode.ClientErrorUnauthorized).json({ message: "access denield unauthrized client" });
    }
    try {
        const secrete = process.env.SECRETE;
        const result = jsonwebtoken_1.default.verify(token, secrete);
        if (!result.id) {
            return res.status(status_code_enum_1.StatusCode.ClientErrorUnauthorized).json({ message: "access denield unauthrized client" });
        }
        req.userId = result.id;
        return next();
    }
    catch (_a) {
        return res.status(status_code_enum_1.StatusCode.ClientErrorUnauthorized).json({ message: "access denield unauthrized client" });
    }
};
exports.default = authMiddleware;
