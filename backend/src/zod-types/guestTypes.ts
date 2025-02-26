import z from "zod";


const guestTypes = z.object({
    publicKey: z.string(),
    captchaValue : z.string(),
    deviceFingerPrint:z.string(),
});

export default guestTypes;