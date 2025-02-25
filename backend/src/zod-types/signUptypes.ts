import z from "zod";


const signUptypes = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  publicKey: z.string(),
  encryptedPrivateKeyData: z.object({
    encryptedPrivateKey: z.string(),
    salt: z.string(),
    nonce: z.string(),
  }),
});

export default signUptypes;
