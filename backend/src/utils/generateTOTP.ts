import speakeasy from "speakeasy";

type generatorRetrunType = {
  otp: string,
  secret: string,
};

const generateTOTP = (): generatorRetrunType => {
  // generate a unique secret for the user
  const secret = speakeasy.generateSecret({ length: 20 }).base32;

  // generate TOTP  valid for 2 minuts
  const otp = speakeasy.totp({
    secret,
    encoding: "base32",
    step: 120,
  });

  return { otp, secret };
};

export default generateTOTP;
