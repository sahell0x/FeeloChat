import { RiCloseFill } from "react-icons/ri";

function ChatHeader() {
  return (
    <div className="h-[10vh] border-b-2 border-[#3a3b45] flex items-center justify-between px-20 bg-[#1b1c24]">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>
        <div className="flex items-center justify-center gap-5">
          <button className="text-gray-400 hover:text-white transition-all duration-300">
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;