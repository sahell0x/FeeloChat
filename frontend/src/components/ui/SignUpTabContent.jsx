import { Input } from "@/components/ui/input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import {
  emailValidator,
  passwordValidator,
  confirmPasswordChecker,
} from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SEND_OTP_ROUTE, SIGNUP_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import userInfoAtom from "@/stores/userInfoAtom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import { encryptPrivateKey, generateKeyPair } from "@/encryption/cryptoUtils";
import { storePrivateKey } from "@/db/indexedDB";
import TryAsGuestDialog from "./TryAsGuestDialog";
import { ClipLoader } from "react-spinners";
import OTPDialog from "./OTPDialog";

function SignUpTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isTryGuestDialogOpend, setIsTryGuestDialogOpend] = useState(false);
  const [isOTPDialogOpend, setIsOTPDialogOpend] = useState(false);
  const [secret, setSecret] = useState("");
  const PURPOSE = "signup";

  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const signUpHandler = async () => {
    if (!emailValidator(email)) {
      toast.error("Please enter a valid email address.");
    } else if (!passwordValidator(password)) {
      toast.error(
        "Password must be at least 8 characters long and include lowercase, uppercase, and special characters."
      );
    } else if (!confirmPasswordChecker(password, confirmPassword)) {
      toast.error("Passwords do not match. Please try again.");
    } else {
      try {
        setIsButtonDisabled(true);

        const response = await apiClient.post(
          SEND_OTP_ROUTE,
          { email, purpose: PURPOSE },
          { withCredentials: true }
        );

        if (response.status === 202) {
          toast.success("OTP sent successfully");
          setSecret(response.data.secret);
          setIsOTPDialogOpend(true);
          setIsButtonDisabled(false);
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

  const submitHandler = async (otp) => {
    try {
      const { publicKey, privateKey } = generateKeyPair();

      const encryptedPrivateKeyData = await encryptPrivateKey(
        privateKey,
        password
      );

      const response = await apiClient.post(
        SIGNUP_ROUTE,
        { otp, secret, email, password, publicKey, encryptedPrivateKeyData },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const userData = response.data;
        setUserInfo({ ...userData });
        await storePrivateKey(privateKey);

        navigate("/profile");
      }
    } catch (error) {
      if (error.status === 401) {
        toast.error("Invalid otp try again");
      } else if (error.status === 429) {
        toast.error("You have entered wrong otp many times try after a while");
      } else {
        toast.error("Unable to submit try again");
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
        {isButtonDisabled ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          "Sign up"
        )}
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
        onClick={() => setIsTryGuestDialogOpend(true)}
        disabled={isButtonDisabled}
        variant="outline"
        className="w-[100%] mt-2 bg-[#2c2e3b] hover:bg-[#3a3b45] text-white hover:text-white"
      >
        Try as Guest
      </Button>
      {isTryGuestDialogOpend && (<TryAsGuestDialog
        isTryGuestDialogOpend={isTryGuestDialogOpend}
        setIsTryGuestDialogOpend={setIsTryGuestDialogOpend}
      />)}
      {isOTPDialogOpend && (
        <OTPDialog
          isOTPDialogOpend={isOTPDialogOpend}
          setIsOTPDialogOpend={setIsOTPDialogOpend}
          email={email}
          purpose={PURPOSE}
          submitHandler={submitHandler}
          setSecret={setSecret}
        />
      )}
    </div>
  );
}

export default SignUpTabContent;
