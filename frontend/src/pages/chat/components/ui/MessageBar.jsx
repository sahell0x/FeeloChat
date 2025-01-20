import { useEffect, useRef, useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";
import ChatInput from "./ChatInput";
import EmojiPicker from "emoji-picker-react";

function MessageBar() {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpend,setIsEmojiPickerOpend] = useState(false);
  const emojiPickerRef = useRef(null);

 const  handleEmojiClick = (e)=>{
  setMessage((prevMessage) => prevMessage.concat(e.emoji));
 }

 const handleClickOutside = (event) => {
  const thisTarget = event.target;
  console.log()
  if (
    emojiPickerRef.current &&
    !emojiPickerRef.current.contains(thisTarget)&&
    !(thisTarget.tagName == "svg")

  ) {
    setIsEmojiPickerOpend(false);
  }
};

useEffect(() => {
  if (isEmojiPickerOpend) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isEmojiPickerOpend]);


 
  return (
  <div className="h-[30vh]  flex justify-center items-center px-5">
      <div className="flex-1 flex rounded-md items-center justify-center flex-row">
        <div className="flex items-center justify-center flex-row">
        
          <textarea
           rows={1}
            type="text"
            className="flex-1 resize-none scrollbar-none overflow-y-auto p-4 pr-12 rounded-md w-[70vw] md:w-[50vw] lg:[50vw] xl:w-[50vw] focus:border-none focus:outline-none"
            placeholder="Type a Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

         
        <div className="relative right-10 flex items-center justify-center">
          <button 
          onClick={()=>{setIsEmojiPickerOpend(!isEmojiPickerOpend)}}
          className="text-gray-700 hover:text-black transition-all duration-300">
            <RiEmojiStickerLine
             className="text-2xl" />
          </button>
          {isEmojiPickerOpend && (
              <div
                ref={emojiPickerRef} 
                className="absolute bottom-16 right-0"
              >
                <EmojiPicker
                  open={isEmojiPickerOpend}
                  onEmojiClick={handleEmojiClick}
                  autoFocusSearch={false}
                />
              </div>
            )}
        </div>

        <button className="bg-purple-400  rounded-md flex items-center justify-center p-4 text-white focus:outline-none transition-all duration-300 hover:bg-purple-500 shadow-md hover:shadow-lg">
          <BiSolidSend className="text-2xl" />
        </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
