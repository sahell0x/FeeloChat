import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import {emailValidator} from "@/util/validator.js";
import { useToast } from "@/hooks/use-toast";
import apiClient from "@/lib/api-client";
import { SIGNIN_ROUTE } from "@/util/constants";


function SignInTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSignIn = async ()=>{
    if(!emailValidator(email)){
      toast({variant: "destructive",
        title: "Please enter valid Email address.",});
    }else if(!password.length){
      toast({variant: "destructive",
        title: "password can not be empty.",});
    }else{
      const response = await apiClient.post(SIGNIN_ROUTE,{email,password},{withCredentials:true});

      console.log(response);
    }
  }
  return (
    <div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" 
        className="mb-2"
      ></Input>
      <PasswordInput
        
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2"
      ></PasswordInput>
      <Button

        onClick={()=>{
          handleSignIn();
        }}
        
        className="w-[100%] mb-2 rounded-full"
      >
        Sign in
      </Button>
      
    </div>
  );
}

export default SignInTabContent;
