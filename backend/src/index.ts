import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { Request,Response,NextFunction } from "express";
const app = express();
const port = process.env.PORT;
const dbUrl: string = process.env.DB_URL as string;

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));

// app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' })); 

app.use(cookieParser());
app.use(express.json());
app.use("/api",userRoutes);
app.use("/api/auth",authRoutes);


app.use((err : any,req :Request,res:Response,next :NextFunction)=>{   // global catch function
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
})

app.listen(port,()=>{
    console.log(`server is runnig at http://localhost:${port}`);
});


mongoose.connect(dbUrl).then(()=>{
    console.log("connected successfully");
}).catch((err)=>{
    console.log("error while connecting");
})
