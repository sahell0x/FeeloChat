import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_APP_PASSWORD 
    }
});

async function sendOTP(email :string) {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 24px; border-radius: 12px; background: #F9F5FF; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border: 1px solid #E0C3FC;">
    <div style="text-align: center; padding: 15px 0;">
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; background: linear-gradient(to right, #3B82F6, #A855F7, #EC4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">
            FeeloChat
        </h1>
        <p style="color: #6B21A8; font-size: 16px; margin-top: 5px; font-weight: 500;">Let your expressions talk.</p>
    </div>

    <div style="background: #6B21A8; padding: 20px; border-radius: 10px; text-align: center; margin-top: 10px;">
        <p style="color: white; font-size: 18px; margin: 0; font-weight: bold;">Your OTP Code</p>
        <h1 style="color: #fff; font-size: 38px; letter-spacing: 6px; margin: 12px 0;">${"111111"}</h1>
        <p style="color: white; font-size: 15px;">This OTP is valid for <strong>5 minutes</strong></p>
    </div>

    <p style="text-align: center; color: #4A4A4A; font-size: 14px; margin-top: 20px; font-weight: 500;">
        If you did not request this OTP, please ignore this email.
    </p>

    <div style="text-align: center; margin-top: 20px; border-top: 1px solid #E0C3FC; padding-top: 12px;">
        <small style="color: #6B21A8; font-size: 13px; font-weight: bold;">&copy; ${new Date().getFullYear()} FeeloChat. All rights reserved.</small>
    </div>
</div>

`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("OTP sent successfully!");
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
}

export default sendOTP;