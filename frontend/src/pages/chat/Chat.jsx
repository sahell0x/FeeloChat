import { useToast } from "@/hooks/use-toast";
import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function Chat() {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  const {toast} = useToast();

  useEffect(()=>{

    if(!userInfo.profileSetup){
      toast({variant: "destructive",
        title: "Please setup Profile first to sign Up",});
        navigate("/profile");
    }

  },[userInfo,navigate]);
  return (
    <div>
      chat route
    </div>
  )
}

export default Chat
