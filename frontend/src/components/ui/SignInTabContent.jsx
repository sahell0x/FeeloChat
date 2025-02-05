import { Input } from "./input";
import { Button } from "./button";
import { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { emailValidator } from "@/util/validator.js";
import apiClient from "@/lib/api-client";
import { SIGNIN_ROUTE } from "@/util/constants";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import toast from "react-hot-toast";
import { base64ToUint8Array } from "@/encryption/base64ToUint8Converter";
import { decryptPrivateKey } from "@/encryption/cryptoUtils";
import { storePrivateKey } from "@/db/indexedDB";

function SignInTabContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const handleSignIn = async () => {
    if (!emailValidator(email)) {
      toast.error("Please enter a valid email address.");
    } else if (!password.length) {
      toast.error("Password cannot be empty.");
    } else {
      try {
        setIsButtonDisabled(true);
        const response = await apiClient.post(SIGNIN_ROUTE, { email, password },{ withCredentials: true });

        if (response.status === 200) {
          const responseData = response.data;
          const userData = responseData.userData;
          const encryptedPrivateKeyData = responseData.encryptedPrivateKeyData;
          console.log("response",responseData);
          console.log(encryptedPrivateKeyData);

          const decryptedPrivateKey = await decryptPrivateKey(encryptedPrivateKeyData.privateKey,encryptedPrivateKeyData.salt,encryptedPrivateKeyData.nonce,password);

         await storePrivateKey(decryptedPrivateKey);

          setUserInfo({...userData});
          setIsButtonDisabled(false);

          if (!userData.profileSetup) {
            navigate("/profile");
          } else {
            navigate("/chat");
          }
        } else {
          setIsButtonDisabled(false);
          toast.error("Wrong email or password.");
        }
      } catch(e) {
        console.log("error",e);
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
        Sign in
      </Button>
    </div>
  );
}

export default SignInTabContent;