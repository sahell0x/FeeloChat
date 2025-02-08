import z from "zod";

//zod types for user sign up input validation


const signUptypes = z.object({
    email: z.string().email(),
    password:z.string().min(8),
    publicKey:z.string(),
});

export default signUptypes;