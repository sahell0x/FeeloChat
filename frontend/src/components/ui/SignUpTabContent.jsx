import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { useToast } from "@/hooks/use-toast";
import {emailValidator,passwordValidator,confirmPasswordChecker} from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import userInfoAtom from "@/stores/userInfoAtom";
import { useSetRecoilState } from "recoil";

function SignUpTabContent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const signUpHandler = async ()=>{
    if(!emailValidator(email)){
      toast({variant: "destructive",
        title: "Please enter valid Email address.",});
    }else if(!passwordValidator(password)){
      toast({variant: "destructive",
        title: "Password must minimum 8 characters long and should contain lowercase uppercase and special characters.",});
    }else if(!confirmPasswordChecker(password,confirmPassword)){
      toast({variant: "destructive",
        title: "Passwords do not match. Please try again.",});
    }else{
      const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true});
      
      if(response.status===201){
        setUserInfo({...response.data});
         navigate("/profile");
      }
    }

    


  }

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2"
      ></Input>

      <PasswordInput
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2"
      ></PasswordInput>
      <PasswordInput
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="mb-5"
      ></PasswordInput>

      <Button
        onClick={()=>{
          signUpHandler();
        }}
        className="w-[100%] mb-2 rounded-full"
      >
        Sign up
      </Button>
      <Button variant="premium" className="w-[100%] rounded-full">
        Try as Guest
      </Button>
    </div>
  );
}

export default SignUpTabContent;
