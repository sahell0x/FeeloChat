import speakeasy from "speakeasy";
 
 const verifyTOTPController   = async (req:any, res:any) => {

    try{
        const { email, otp, token } = req.body;
        if (!email || !otp || !token) return res.status(400).json({ message: "Missing fields" });
      
        // Decode secret
        const secret = token;
      console.log(secret);
        // Verify OTP
        const isValid = speakeasy.totp.verify({
          secret,
          encoding: "base32",
          token: otp,
          step:120,
          window: 1, // Allow small time drift
        });
      
        if (isValid) {
          return res.json({ success: true, message: "OTP verified" });
        } else {
          return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    }catch(e:any){
        console.log(e.message);
    }
  }

  export default verifyTOTPController;