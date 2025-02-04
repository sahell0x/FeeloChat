import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import { Request,Response,NextFunction } from "express";
import rateLimit from "express-rate-limit";
import socketSetup from "./socket";
const app = express();
const port = process.env.PORT;
const dbUrl: string = process.env.DB_URL as string;

//cors defination

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));

// app.use(cors({ origin: '*' }));

//increased limit of json for req and res case feelochat stores profile images as compressed base64 string (this is not good practice but the application is going to hosted on free services like render || vercel so that we have to consider serverless architecture and boost the speed of developmet.).

app.use(express.json({ limit: '5mb' })); 

app.use(cookieParser());
app.use(express.json());

// rate limit the ip's to prevent from common attacks like  DDoS and prevent Feelochat endPoint from the traffic other then Feelochat frontend

const limiter = rateLimit({
    windowMs: 1000,
    max: 5, 
    message: 'Too many requests from this IP, please try again later.',
    handler: (req:Request, res:Response) => {
      res.status(429).json({
        message: 'Too many requests, please try again later.',
      });
    },
  });
  
  app.use(limiter);


//entry routes for user and auth

app.use("/api",userRoutes);
app.use("/api/auth",authRoutes);


//global catch

app.use((err : any,req :Request,res:Response,next :NextFunction)=>{   
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
      });
})


const server = app.listen(port,()=>{
    console.log(`server is runnig at http://localhost:${port}`);
});

//passing the current http server to socket io

socketSetup(server);

//Database connection logic

mongoose.connect(dbUrl).then(()=>{
    console.log("connected to DB successfully");
}).catch((err)=>{
    console.log("error while connecting");
})
