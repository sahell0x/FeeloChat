import { useState } from "react"
import ChatHeader from "./ui/ChatHeader"
import MessageBar from "./ui/MessageBar"
import MessageContainer from "./ui/MessageContainer"

function ChatContainer() {
  const [shouldScroll,setShouldScroll] = useState(true);
   return (
    <div className="bg-[#1b1c24]">
      <ChatHeader/>
      <MessageContainer shouldScroll={shouldScroll} setShouldScroll={setShouldScroll}/>
      <MessageBar setShouldScroll={setShouldScroll}/>
    </div>
  )
}

export default ChatContainer
