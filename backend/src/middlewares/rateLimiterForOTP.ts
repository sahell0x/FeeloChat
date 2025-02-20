import rateLimit from "express-rate-limit";

// OTP verification limiter 5 attempts per 2 minutes
const ratelimiterForOTP = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 10,
  message: "Too many OTP attempts. Please try again later.",
});

export default ratelimiterForOTP;