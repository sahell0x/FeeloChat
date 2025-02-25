import rateLimit from "express-rate-limit";

const ratelimiterForOTP = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 10,
  message: "Too many OTP attempts. Please try again later.",
});

export default ratelimiterForOTP;