import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import ContactContainer from "./components/ContactContainer";
import EmptyChatContainer from "./components/EmptyChatContainer";
import ChatContainer from "./components/ChatContainer";

function Chat() {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  useEffect(()=>{

    if(!userInfo.profileSetup){
      toast('Please setup Profile first!', {
        icon: '⚠️',
      });
        navigate("/profile");
    }

  },[userInfo,navigate]);
  return (
    <div className="flex h-[100vh]  text-[#1f2937] overflow-hidden">
      <ContactContainer/>
      <EmptyChatContainer/>
      <ChatContainer/>
    </div>
  )
}

export default Chat


// Background: #1e293b (Dark Gray, Tailwind: bg-gray-800)
// Border: #4b5563 (Muted Gray, Tailwind: border-gray-600)
// Text: #f3f4f6 (Light Gray, Tailwind: text-gray-100)

