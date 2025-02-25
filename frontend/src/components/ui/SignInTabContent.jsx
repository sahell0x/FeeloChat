import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { emailValidator } from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SEND_OTP_ROUTE, SIGNIN_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import toast from "react-hot-toast";
import { decryptPrivateKey } from "@/encryption/cryptoUtils";
import { storePrivateKey } from "@/db/indexedDB";
import { ClipLoader } from "react-spinners";
import OTPDialog from "./OTPDialog";

function SignInTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [isOTPDialogOpend, setIsOTPDialogOpend] = useState(false);
  const [secret, setSecret] = useState("");
  const PURPOSE = "signin";

  const submitHandler = async (otp) => {
    try {
      const response = await apiClient.post(
        SIGNIN_ROUTE,
        { otp, secret, email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const responseData = response.data;
        const userData = responseData.userData;
        const encryptedPrivateKeyData = responseData.encryptedPrivateKeyData;

        const decryptedPrivateKey = await decryptPrivateKey(
          encryptedPrivateKeyData.privateKey,
          encryptedPrivateKeyData.salt,
          encryptedPrivateKeyData.nonce,
          password
        );

        await storePrivateKey(decryptedPrivateKey);
        setUserInfo({ ...userData });

        if (!userData.profileSetup) {
          navigate("/profile");
        } else {
          navigate("/chat");
        }
      } else {
        throw new Error("somthing wents wrong");
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

  const handleSignIn = async () => {
    if (!emailValidator(email)) {
      toast.error("Please enter a valid email address.");
    } else if (!password.length) {
      toast.error("Password cannot be empty.");
    } else {
      try {
        setIsButtonDisabled(true);
        const response = await apiClient.post(
          SEND_OTP_ROUTE,
          { email, password, purpose: PURPOSE },
          { withCredentials: true }
        );

        if (response.status === 202) {
          toast.success("OTP sent successfully");
          setSecret(response.data.secret);
          setIsOTPDialogOpend(true);
          setIsButtonDisabled(false);
        } else {
          throw new Error("somthing wents wrong");
        }
      } catch (e) {
        setIsButtonDisabled(false);
        toast.error("Wrong email or password.");
      }
    }
  };

  return (
    <div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-2 bg-[#2c2e3b] border-[#3a3b45] text-white"
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-2 bg-[#2c2e3b] border-[#3a3b45] text-white"
      />
      <Button
        disabled={isButtonDisabled}
        onClick={handleSignIn}
        className="w-[100%] mb-2 mt-2 bg-purple-700 hover:bg-purple-900 text-white"
      >
        {isButtonDisabled ? (
          <ClipLoader size={20} color="#ffffff" />
        ) : (
          "Sign in"
        )}
      </Button>

      {isOTPDialogOpend && (
        <OTPDialog
          isOTPDialogOpend={isOTPDialogOpend}
          setIsOTPDialogOpend={setIsOTPDialogOpend}
          email={email}
          purpose={PURPOSE}
          password={password}
          submitHandler={submitHandler}
          setSecret={setSecret}
        />
      )}
    </div>
  );
}

export default SignInTabContent;
