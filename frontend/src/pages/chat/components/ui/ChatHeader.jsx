import chatAtom from "@/stores/chatAtom";
import contactInfoSelector from "@/stores/contactInfoSelector";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ProfileWrapper from "./ProfileWrapper";

function ChatHeader() {

  const chatStateReset = useResetRecoilState(chatAtom);
  const contactInfo = useRecoilValue(contactInfoSelector);

  return (
    <div className="h-[10vh] border-b-2 border-[#3a3b45] flex items-center justify-between px-20 bg-[#1b1c24]">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
          <ProfileWrapper firstName={contactInfo.firstName} lastName={contactInfo.lastName} email={contactInfo.email} img={contactInfo.img} />
          <button
          onClick={()=>chatStateReset()}
           className="text-gray-400 hover:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;