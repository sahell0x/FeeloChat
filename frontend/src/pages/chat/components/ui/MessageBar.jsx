import { useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";

function MessageBar() {
  const [message, setMessage] = useState("");
  return (
    <div className="h-[10vh] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex rounded-md items-center justify-center gap-5 pr-5">
        <div>
          <input
            type="text"
            className="flex-1 p-5 rounded-md w-[70vw] focus:border-none focus:outline-none"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="relative right-20 flex items-center justify-center">
          <button className="text-gray-700 hover:text-black transition-all duration-300">
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0"> emoji peacker</div>
        </div>

        <button className="bg-purple-400 rounded-md flex items-center justify-center p-4 text-white focus:outline-none transition-all duration-300 hover:bg-purple-500 shadow-md hover:shadow-lg">
          <BiSolidSend className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default MessageBar;
