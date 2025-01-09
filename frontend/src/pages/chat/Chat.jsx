import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function Chat() {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  useEffect(()=>{

    if(!userInfo.profileSetup){
      toast((t) => (
        <span>
          Please setup Profile first
          <button onClick={() => toast.dismiss(t.id)}>
            Ok
          </button>
        </span>
      ));
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
