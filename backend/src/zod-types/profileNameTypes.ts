import z from "zod";

//regex and zod types to parse user profile for input validation

const profileNameTypes = z.object({
    firstName: z.string().min(2).regex(/^[a-zA-Z]+$/),
    lastName:z.string().min(2).regex(/^[a-zA-Z]+$/),
});

export default profileNameTypes;