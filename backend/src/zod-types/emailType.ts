import z from "zod";


const emailType = z.object({
   email:z.string().email(),
});

export default emailType;