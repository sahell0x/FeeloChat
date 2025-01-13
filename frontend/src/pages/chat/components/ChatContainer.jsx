import ChatHeader from "./ui/ChatHeader"
import MessageBar from "./ui/MessageBar"
import MessageContainer from "./ui/MessageContainer"

function ChatContainer() {
  return (
    <div className="bg-[#f9fafb]">
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default ChatContainer
