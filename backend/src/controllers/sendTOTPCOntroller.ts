import { StatusCode } from "status-code-enum";
import User from "../models/userModel";
import emailType from "../zod-types/emailType";
import generateTOTP from "../utils/generateTOTP";
import emailService from "../utils/emailService";
import { UserType } from "../types/userTypes";
import { compare } from "bcrypt";

const sendTOTPController = async (req: any, res: any) => {
  try {
    const requestBody = req.body;

    if (requestBody.purpose && requestBody.purpose) {
      const email = requestBody.email;

      if (requestBody.purpose === "signup") {
        const { success } = emailType.safeParse({ email });

        if (success) {
          const user = await User.findOne({ email });
          if (!user) {
            const { otp, secret } = generateTOTP();

            await emailService(email, otp);

            return res.status(StatusCode.SuccessAccepted).json({
              secret,
              message: "otp sent successfully.",
            });
          }

          return res.status(StatusCode.ClientErrorConflict).json({
            message: "email already exist",
          });
        }

        throw new Error("invalid email address");
      } else if (requestBody.purpose === "signin") {
        const password = requestBody.password;

        if (!email && !password) {
          throw new Error("Invalid inputs");
        }

        const user: UserType = await User.findOne({ email });

        if (!user) {
          return res
            .status(StatusCode.ClientErrorBadRequest)
            .json({ message: "Wrong email or password" });
        }


        const isMatch = await compare(password, user.password);

        if (!isMatch) {
          return res
            .status(StatusCode.ClientErrorBadRequest)
            .json({ message: "wrong email or password" });
        }

        const { otp, secret } = generateTOTP();

        await emailService(email, otp);

        return res.status(StatusCode.SuccessAccepted).json({
          secret,
          message: "otp send successfully",
        });
      }
    }

    throw new Error("Invalid inputs");
  } catch (e: any) {
    console.log(e.message);
    return res.status(StatusCode.ClientErrorBadRequest).json({
      message: "bad request",
    });
  }
};

export default sendTOTPController;
