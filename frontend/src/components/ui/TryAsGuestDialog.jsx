import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";
import apiClient from "@/lib/api-client";
import { GUEST_ROUTE } from "@/util/constants";
import { generateKeyPair } from "@/encryption/cryptoUtils";
import { storePrivateKey } from "@/db/indexedDB";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useSetRecoilState } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import getDeviceFingerPrint from "@/util/getDeviceFingerPrint";

function TryAsGuestDialog({ isTryGuestDialogOpend, setIsTryGuestDialogOpend }) {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateGuest = async (executeRecaptcha) => {
    try {
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA not ready");
        return;
      }

      setIsLoading(true);
      const captchaValue = await executeRecaptcha("submit");
      const deviceFingerPrint = await getDeviceFingerPrint();
      const { publicKey, privateKey } = generateKeyPair();

      const response = await apiClient.post(
        GUEST_ROUTE,
        { publicKey, captchaValue, deviceFingerPrint },
        { withCredentials: true }
      );

      if (response.status === 201) {
        await storePrivateKey(privateKey);
        setUserInfo({ ...response.data });
        navigate("/chat");
        toast.success("Guest account created successfully.");
      }
    } catch (e) {
      if(e.status === 409){
        toast.error("Account with this device already exists. Try again after a week.");
      }else if(e.status === 403){
        toast.error("Guess what? You're either a bot or just really bad at clicking buttons.");
      }else{
        toast.error("Something went wrong, please try again.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_SITE_KEY}>
      <Dialog
        open={isTryGuestDialogOpend}
        onOpenChange={isLoading ? () => {} : setIsTryGuestDialogOpend}
      >
        <DialogContent className="bg-[#181920] border-none text-white w-[350px] h-[210px] flex flex-col md:w-[400px] md:h-[200px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-xl font-semibold">
              Guest Access Policy
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center flex-col gap-5">
            <div className="text-sm text-white/90 mt-1">
              Guest accounts expire in 24 hours, and you can create a new one after a week.
            </div>
            <ReCaptchaButton handleCreateGuest={handleCreateGuest} isLoading={isLoading} />
          </div>
        </DialogContent>
      </Dialog>
    </GoogleReCaptchaProvider>
  );
}

function ReCaptchaButton({ handleCreateGuest, isLoading }) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return (
    <Button
      disabled={isLoading}
      onClick={() => handleCreateGuest(executeRecaptcha)}
      className="bg-purple-700 hover:bg-purple-900 w-[40%]"
    >
      {isLoading ? <ClipLoader size={20} color="#ffffff" /> : "Agree & Continue"}
    </Button>
  );
}

export default TryAsGuestDialog;
