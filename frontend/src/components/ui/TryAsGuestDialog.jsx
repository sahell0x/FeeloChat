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
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import getDeviceFingerPrint from "@/util/getDeviceFingerPrint";

function TryAsGuestDialog({ isTryGuestDialogOpend, setIsTryGuestDialogOpend }) {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const recaptcha = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateGuest = async () => {
    try {
      const captchaValue = recaptcha.current.getValue();

      if (!captchaValue) {
        toast.error("Please verify captcha");
        return;
      }

      const deviceFingerPrint = await getDeviceFingerPrint();

      setIsLoading(true);

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
        toast.success("Guest acount created successfully.");
      }
      setIsLoading(false);
    } catch (e) {
      if (e.status === 409) {
        toast.error(
          "Acount with this device already exist please try after a week"
        );
      } else {
        toast.error("Somthing wents wrong please Try again");
      }
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isTryGuestDialogOpend}
      onOpenChange={isLoading ? () => {} : setIsTryGuestDialogOpend}
    >
      <DialogContent className="bg-[#181920] border-none text-white w-[350px] h-[310px] flex flex-col md:w-[400px] md:h-[300px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-xl font-semibold">
            Guest Access Policy
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col gap-5">
          <div className="text-sm text-white/90 mt-1">
            Guest accounts expire in 24 hours, and you can create a new one
            after a week.
          </div>
          <ReCAPTCHA
            ref={recaptcha}
            sitekey={import.meta.env.VITE_SITE_KEY}
            theme="dark"
            onChange={(value) => console.log("ReCAPTCHA verified:", value)}
            onExpired={() => console.log("ReCAPTCHA expired, please refresh")}
            
          />
          <Button
            disabled={isLoading}
            onClick={handleCreateGuest}
            className="bg-purple-700 hover:bg-purple-900 w-[40%]"
          >
            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Agree & Continue"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TryAsGuestDialog;
