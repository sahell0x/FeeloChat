import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import {emailValidator} from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SIGNIN_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import toast from "react-hot-toast";


function SignInTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled,setIsButtonDisabled]  = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const handleSignIn = async ()=>{
    if(!emailValidator(email)){
      toast.error("Please enter valid Email address.");
    }else if(!password.length){
      toast.error("password can not be empty.");
    }else{
     try{ 
      setIsButtonDisabled(true);
      
      const response = await apiClient.post(SIGNIN_ROUTE,{email,password},{withCredentials:true});
     

      if(response.status===200){
        setUserInfo({...response.data});  ///set user data to the atom
        setIsButtonDisabled(false);

        if(!response.data.profileSetup){
          navigate("/profile");
        }else{
          navigate("/chat");
        }
      }else{
        setIsButtonDisabled(false);

        toast.error("Wrong email or password.");
      }
     }catch{
      setIsButtonDisabled(false);

        toast.error("Wrong email or password.");
     }
      
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
      <Button disabled={isButtonDisabled}

        onClick={()=>{
          handleSignIn();
        }}
        
        className="w-[100%] mb-2 mt-2"
      >
        Sign in
      </Button>
      
    </div>
  );
}

export default SignInTabContent;
