import speakeasy from "speakeasy";

type generatorRetrunType = {
  otp: string,
  secret: string,
};

const generateTOTP = (): generatorRetrunType => {
  const secret = speakeasy.generateSecret({ length: 20 }).base32;

  const otp = speakeasy.totp({
    secret,
    encoding: "base32",
    step: 60,
  });

  console.log(otp);

  return { otp, secret };
};

export default generateTOTP;
