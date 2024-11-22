import z from "zod";

const signUptypes = z.object({
    email: z.string().email(),
    password:z.string().min(8),
    firstName: z.string.max(30).min(2),
    lastName: z.string.max(30).min(2)
});

export default signUptypes;