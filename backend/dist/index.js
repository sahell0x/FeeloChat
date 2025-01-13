"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const authRoutes_js_1 = __importDefault(require("./routes/authRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
app.use((0, cors_1.default)({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
// app.use(cors({ origin: '*' }));
app.use(express_1.default.json({ limit: '5mb' }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api", userRoutes_js_1.default);
app.use("/api/auth", authRoutes_js_1.default);
app.get("/", (req, res) => {
    res.send("hi there");
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});
app.listen(port, () => {
    console.log(`server is runnig at http://localhost:${port}`);
});
mongoose_1.default.connect(dbUrl).then(() => {
    console.log("connected successfully");
}).catch((err) => {
    console.log("error while connecting");
});
