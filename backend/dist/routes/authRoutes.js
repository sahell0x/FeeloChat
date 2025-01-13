"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpMiddleware_js_1 = __importDefault(require("../middlewares/signUpMiddleware.js"));
const signUpController_js_1 = __importDefault(require("../controllers/signUpController.js"));
const signInMiddleware_js_1 = __importDefault(require("../middlewares/signInMiddleware.js"));
const signInController_js_1 = __importDefault(require("../controllers/signInController.js"));
const authRoutes = (0, express_1.Router)();
authRoutes.post("/signup", signUpMiddleware_js_1.default, signUpController_js_1.default);
authRoutes.post("/signin", signInMiddleware_js_1.default, signInController_js_1.default);
exports.default = authRoutes;
