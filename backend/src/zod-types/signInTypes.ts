import z from "zod";


const singInTypes = z.object({
    email: z.string().email(),
    password:z.string(),
});

export default singInTypes;