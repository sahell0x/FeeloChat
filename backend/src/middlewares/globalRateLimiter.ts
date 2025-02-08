import rateLimit from "express-rate-limit";
import { blockList } from "../index";

const globalRateLimiter = rateLimit({
    windowMs: 1000, 
    max: 10,
    message: 'Too many requests from this IP, please try again later.',
    handler: (req: any, res: any) => {
        // Block the IP for 30 minutes when limit is exceeded
        blockList.set(req.ip, Date.now() + 30 * 60 * 1000);
        res.status(429).json({
            message: 'Too many requests. You have been blocked for 30 minutes.',
        });
    },
});

export default globalRateLimiter;