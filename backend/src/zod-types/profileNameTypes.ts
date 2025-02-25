import z from "zod";


const profileNameTypes = z.object({
    firstName: z.string().min(2).regex(/^[a-zA-Z]+$/),
    lastName:z.string().min(2).regex(/^[a-zA-Z]+$/),
});

export default profileNameTypes;