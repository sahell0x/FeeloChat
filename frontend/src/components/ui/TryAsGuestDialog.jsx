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

function TryAsGuestDialog({ isTryGuestDialogOpend, setIsTryGuestDialogOpend }) {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateGuest = async () => {
    try {
      setIsLoading(true);
      const { publicKey, privateKey } = generateKeyPair();

      const response = await apiClient.post(
        GUEST_ROUTE,
        { publicKey },
        { withCredentials: true }
      );
      if (response.status === 201) {
        await storePrivateKey(privateKey);
        setUserInfo({...response.data});
        navigate("/chat");
        toast.success("Guest acount created successfully.");
      }
      setIsLoading(false);
    } catch (e) {
        console.log(e);
      if (e.status === 409) {
        toast.error("Acount with this IP already exist please try after a week");
      } else {
        toast.error("Somthing wents wrong please Try again");
      }
      setIsLoading(false);

    }
   
  };

  return (
    <Dialog open={isTryGuestDialogOpend} onOpenChange={isLoading ? ()=>{} : setIsTryGuestDialogOpend}>
      <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[200px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-xl font-semibold">
            Guest Access Policy
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col gap-5">
          <div className="text-sm text-white/90 mt-1">
            We track IPs to prevent misuse. Guest accounts expire in 24 hours,
            and you can create a new one after a week.
          </div>
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
