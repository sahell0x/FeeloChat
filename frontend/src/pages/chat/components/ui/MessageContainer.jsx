import React, { useEffect, useRef } from "react";
import "../../../../App.css";
import { useRecoilValue } from "recoil";
import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import moment from "moment";

function MessageContainer() {
  const selectedChatMessages = useRecoilValue(selectedChatMessagesAtom);
  const selectedChatData = useRecoilValue(selectedChatDataAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);

  const ScrollRef = useRef();

 const renderMessages = ()=>{
    let lastData = null;

    return selectedChatMessages.map((message)=>{
        const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
        const showData = messageDate !== lastData;

        lastData = messageDate;

        return (
          <div key={message._id}>
              {
                 showData && (
                   <div className="text-center text-gray-500 my-2">
                    {moment(message.timestamp).format("LL")}
                   </div>
                 )
              }
          </div>
        )
    });
 }

  useEffect(()=>{
   if(ScrollRef.current){
      ScrollRef.current.scrollIntoView({behavior:"smooth"});
   }
  },[selectedChatMessages]);
  return (
    <div
      className="flex-1 overflow-y-auto h-[70vh] bg-[#1b1c24] text-white scrollbar-thin scrollbar-thumb-[#3a3b45] scrollbar-track-transparent hover:scrollbar-thumb-[#4c4d5c] w-[100vw]  pb-11 p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]"
    >
        {renderMessages()}
      <div ref={ScrollRef} />
    </div>
  );
}

export default MessageContainer;