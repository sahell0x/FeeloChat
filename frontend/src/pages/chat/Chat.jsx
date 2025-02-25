import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ContactContainer from "./components/ContactContainer";
import EmptyChatContainer from "./components/EmptyChatContainer";
import ChatContainer from "./components/ChatContainer";
import  { selectedChatTypeAtom } from "@/stores/chatAtom";
import { getPrivateKey } from "@/db/indexedDB";
import privateKeyAtom from "@/stores/privateKeyAtom";
import apiClient from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/util/constants";
import isMobileAtom from "@/stores/isMobileAtom";

function Chat() {
  const userInfo = useRecoilValue(userInfoAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);
  const setPrivateKey = useSetRecoilState(privateKeyAtom);
  const isMobile = useRecoilValue(isMobileAtom);


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
    <div className="flex h-[100vh]  text-[#1f2937] overflow-hidden">

  {(!isMobile || !selectedChatType) && <ContactContainer />}

  {selectedChatType ? <ChatContainer /> : !isMobile && <EmptyChatContainer />}
    </div>
  )
}

export default Chat


