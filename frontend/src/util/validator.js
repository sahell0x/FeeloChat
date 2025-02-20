import z from "zod";

export const emailValidator = (email)=>{
    const emailSchema = z.string().email();
    const {success} = emailSchema.safeParse(email);

    if(success){
        return true;
    }
    return false;

};

export const passwordValidator = (password,confirmPassword)=>{
    const passwordValidation = new RegExp( 
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );

      const passwordSchema = z.string().regex(passwordValidation);

      const {success} = passwordSchema.safeParse(password);

      if(success){
        return true;
      }
      return false;

}

export const confirmPasswordChecker = (password,confirmPassword)=>{
    if(password === confirmPassword){
        return true;
    }return false;
}

export const profileNameValidator = (input) =>{
    const letterOnlySchema = z.string().regex(/^[a-zA-Z]+$/); 


const {success} = letterOnlySchema.safeParse(input);

if(!success){
   return false;
}

return true;

   
}