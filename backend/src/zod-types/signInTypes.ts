import z from "zod";

//zod types for user sign in input validation

const singInTypes = z.object({
    email: z.string().email(),
    password:z.string(),
});

export default singInTypes;