import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import {emailValidator,passwordValidator,confirmPasswordChecker} from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import userInfoAtom from "@/stores/userInfoAtom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";

function SignUpTabContent() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled,setIsButtonDisabled]  = useState(false);

  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const signUpHandler = async ()=>{
    if(!emailValidator(email)){
      toast.error("Please enter valid Email address.");
    }else if(!passwordValidator(password)){
      toast.error("Password must minimum 8 characters long and should contain lowercase uppercase and special characters.");

    }else if(!confirmPasswordChecker(password,confirmPassword)){
      toast.error("Passwords do not match. Please try again.");
    }else{
     try{
      setIsButtonDisabled(true);
      const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true});
      
      if(response.status===201){
        setUserInfo({...response.data});
        setIsButtonDisabled(false);

         navigate("/profile");
      }
     }catch(response){
      setIsButtonDisabled(false);
      if(response.status==409){
        toast.error("Email already exist.");
      }else{
        toast.error("Somthing wents wrong please try again.");

      }
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
        className="mb-4"
      ></PasswordInput>

      <Button disabled={isButtonDisabled}
        onClick={()=>{
          signUpHandler();
        }}
        className="w-[100%] mb-2 "
      >
        Sign up
      </Button>
      <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
      <Button disabled={isButtonDisabled} variant="outline" className="w-[100%]  mt-2">
        Try as Guest
      </Button>
    </div>
  );
}

export default SignUpTabContent;
