import z from "zod";

const signUptypes = z.object({
    email: z.string().email(),
    password:z.string().min(8),
    img:z.string().optional(),

});

export default signUptypes;