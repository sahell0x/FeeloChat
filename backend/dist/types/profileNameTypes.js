"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const profileNameTypes = zod_1.default.object({
    firstName: zod_1.default.string().min(2).regex(/^[a-zA-Z]+$/),
    lastName: zod_1.default.string().min(2).regex(/^[a-zA-Z]+$/),
});
exports.default = profileNameTypes;
