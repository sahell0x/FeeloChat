import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ProfileWrapper from "./ProfileWrapper";

function ChatHeader() {
  const selectedChatDataReset = useResetRecoilState(selectedChatDataAtom);
  const selectedChatTypeReset = useResetRecoilState(selectedChatTypeAtom);
  const selectedChatMessageReset = useResetRecoilState(selectedChatMessagesAtom);

  const selectedChatData = useRecoilValue(selectedChatDataAtom);

  return (
    <div className="h-[10vh] border-b-2 border-[#3a3b45] flex items-center justify-between px-20 bg-[#1b1c24]">
      <ProfileWrapper
        firstName={selectedChatData.firstName}
        lastName={selectedChatData.lastName}
        email={selectedChatData.email}
        img={selectedChatData.img}
      />
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-between"></div>
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => {

               selectedChatDataReset();
               selectedChatTypeReset(); 
               selectedChatMessageReset();            
            }}
            className="text-gray-400 hover:text-white transition-all duration-300"
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
