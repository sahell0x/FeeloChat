import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { emailValidator, passwordValidator, confirmPasswordChecker } from "@/util/validator.js";
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const signUpHandler = async () => {
    if (!emailValidator(email)) {
      toast.error("Please enter a valid email address.");
    } else if (!passwordValidator(password)) {
      toast.error("Password must be at least 8 characters long and include lowercase, uppercase, and special characters.");
    } else if (!confirmPasswordChecker(password, confirmPassword)) {
      toast.error("Passwords do not match. Please try again.");
    } else {
      try {
        setIsButtonDisabled(true);
        const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });

        if (response.status === 201) {
          setUserInfo({ ...response.data });
          setIsButtonDisabled(false);
          navigate("/profile");
        }
      } catch (error) {
        setIsButtonDisabled(false);
        if (error.response?.status === 409) {
          toast.error("Email already exists.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 bg-[#2c2e3b] border-[#3a3b45] text-white"
      />
      <PasswordInput
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 bg-[#2c2e3b] border-[#3a3b45] text-white"
      />
      <PasswordInput
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="mb-4 bg-[#2c2e3b] border-[#3a3b45] text-white"
      />
      <Button
        disabled={isButtonDisabled}
        onClick={signUpHandler}
        className="w-[100%] mb-2 bg-purple-700 hover:bg-purple-900 text-white"
      >
        Sign up
      </Button>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[#2c2e3b] text-gray-400">or</span>
        </div>
      </div>
      <Button
        disabled={isButtonDisabled}
        variant="outline"
        className="w-[100%] mt-2 bg-[#2c2e3b] hover:bg-[#3a3b45] text-white hover:text-white"
      >
        Try as Guest
      </Button>
    </div>
  );
}

export default SignUpTabContent;