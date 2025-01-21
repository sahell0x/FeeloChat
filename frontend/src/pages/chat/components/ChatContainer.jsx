import ChatHeader from "./ui/ChatHeader"
import MessageBar from "./ui/MessageBar"
import MessageContainer from "./ui/MessageContainer"

function ChatContainer() {
  return (
    <div className="bg-[#1b1c24]">
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default ChatContainer
