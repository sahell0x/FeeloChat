import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const emailService = async (email: string, OTP: string) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; }
        .email-container { 
            max-width: 600px; 
            margin: auto; 
            background-color: #1b1c24; 
            color: white; 
            border-radius: 8px; 
            overflow: hidden;
        }
        .email-header { 
            background-color: #2c2e3b; 
            padding: 20px; 
            text-align: center;
        }
        .otp-code { 
            background-color: #5b21b6; 
            color: white; 
            padding: 15px; 
            text-align: center; 
            font-size: 32px; 
            letter-spacing: 10px;
        }
        .gradient-text {
            background: linear-gradient(to right, #3b82f6, #a855f7, #ec4899);
         -webkit-background-clip: text;
         background-clip: text;
         color: transparent;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1 class="gradient-text">FeelloChat</h1>
            <p>Let Your Expressions Talk ✨</p>
        </div>
        <div style="padding: 20px; text-align: center;">
            <h2>Verification Code</h2>
            <p>Enter this code to verify your account:</p>
            <div class="otp-code">${OTP}</div>
            <p style="margin-top: 15px; color: #a0a0a0;">
                This code will expire in 2 minutes
            </p>
        </div>
    </div>
</body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent successfully!");
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};

export default emailService;
