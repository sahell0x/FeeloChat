import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState } from "recoil";
import ProfileWrapper from "./ProfileWrapper";
import { Circle, RectangleEllipsis } from "lucide-react";
import onlineStatusAtom from "@/stores/onlineStatusAtom";
import { useEffect, useState } from "react";




function ChatHeader() {
  const selectedChatDataReset = useResetRecoilState(selectedChatDataAtom);
  const selectedChatTypeReset = useResetRecoilState(selectedChatTypeAtom);
  const selectedChatMessageReset = useResetRecoilState(selectedChatMessagesAtom);
  const selectedChatData = useRecoilValue(selectedChatDataAtom);

  const onlineStatusState = useRecoilValue(onlineStatusAtom);

  const [isUserOnline,setIsUserOnline] = useState(false);


// useEffect(() => {

//   setIsUserOnline(onlineStatusState.contents[selectedChatData._id]);

// }, [onlineStatusState, selectedChatData]);



  return (
    <div className="h-[10vh] border-b-2 border-[#3a3b45] flex items-center justify-between px-20 bg-[#1b1c24]">
      <div className="">
      <ProfileWrapper
        firstName={selectedChatData.firstName}
        lastName={selectedChatData.lastName}
        email={selectedChatData.email}
        img={selectedChatData.img}
      />
      <Circle
            className={`relative  left-10 bottom-4  z-10 h-3 w-3 ${
              
              onlineStatusState[selectedChatData._id]
                ? "fill-green-600 text-green-600"
                : "fill-gray-500 text-gray-500"
            }`}
          />
      </div>
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
