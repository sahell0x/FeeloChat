import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContactContainer from "./components/ContactContainer";
import EmptyChatContainer from "./components/EmptyChatContainer";
import ChatContainer from "./components/ChatContainer";
import  { selectedChatTypeAtom } from "@/stores/chatAtom";
import { SocketProvider } from "@/context/SocketContext";
import { getPrivateKey } from "@/db/indexedDB";
import privateKeyAtom from "@/stores/privateKeyAtom";
import apiClient from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/util/constants";

function Chat() {
  const userInfo = useRecoilValue(userInfoAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);
  const setPrivateKey = useSetRecoilState(privateKeyAtom);

  const navigate = useNavigate();


  useEffect(()=>{
    (
      async()=>{
        const privateKey = await getPrivateKey();
        if(privateKey){
          setPrivateKey(privateKey);
        }else{
          await apiClient.post(LOGOUT_ROUTE,{},{withCredentials:true});
          toast.error("Somthing is wrong please signn again.");
        }
      }
    )();
       
  },[]);

  useEffect(()=>{

    if(!userInfo.profileSetup){
      toast('Please setup Profile first!', {
        icon: '⚠️',
      });
        navigate("/profile");
    }

  },[userInfo,navigate]);
  return (
    <SocketProvider>
    <div className="flex h-[100vh]  text-[#1f2937] overflow-hidden">
      <ContactContainer/>
      
      {selectedChatType ?  <ChatContainer/> : <EmptyChatContainer/>  }
   
    </div>
    </SocketProvider>
  )
}

export default Chat


