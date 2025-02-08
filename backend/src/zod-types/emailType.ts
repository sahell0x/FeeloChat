import z from "zod";

//regex and zod types to parse user profile for input validation

const emailType = z.object({
   email:z.string().email(),
});

export default emailType;