import { useRef, useState } from "react";
import ChatHeader from "./ui/ChatHeader";
import MessageBar from "./ui/MessageBar";
import MessageContainer from "./ui/MessageContainer";

function ChatContainer() {
  const containerRef = useRef(null);

  containerRef?.current?.addEventListener("keypress",(e)=>{
})

  return (
    <div ref={containerRef} className="bg-[#1b1c24] w-full md:w-[60vw] lg:w-full ">
      <ChatHeader />
      <MessageContainer />
      <MessageBar containerRef={containerRef} />
    </div>
  );
}

export default ChatContainer;
