import { useEffect, useRef, useState } from "react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { BiSolidSend } from "react-icons/bi";
import EmojiPicker from "emoji-picker-react";
import { useRecoilValue } from "recoil";
import { selectedChatDataAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import userInfoAtom from "@/stores/userInfoAtom";
import toast from "react-hot-toast";
import { encryptMessageForBoth } from "@/encryption/cryptoUtils";
import { getPrivateKey } from "@/db/indexedDB";
import socket from "@/socket";

function MessageBar({setShouldScroll}) {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpend, setIsEmojiPickerOpend] = useState(false);
  const emojiPickerRef = useRef(null);
  const userInfo = useRecoilValue(userInfoAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);
  const selectedChatData = useRecoilValue(selectedChatDataAtom);

  const handleEmojiClick = (e) => {
    setMessage((prevMessage) => prevMessage.concat(e.emoji));
  };

  const handleClickOutside = (event) => {
    const thisTarget = event.target;
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(thisTarget) &&
      !(thisTarget.tagName == "svg")
    ) {
      setIsEmojiPickerOpend(false);
    }
  };

  const handleSend = async () => {
    try {
      if (selectedChatType === "contact" && message.trim()) {
        if (socket.connected) {
          console.log("inside send");

          const privateKey = await getPrivateKey();

          console.log(userInfo);
          console.log(selectedChatData);
          console.log(privateKey);

          const encryptedMessageData = encryptMessageForBoth(
            message.trim(),
            selectedChatData.publicKey,
            userInfo.publicKey,
            privateKey
          );

          socket.emit("sendMessage", {
            sender: userInfo.id,
            receiver: selectedChatData._id,
            cipherTextForReceiver: encryptedMessageData.cipherTextForReceiver,
            cipherTextForSender: encryptedMessageData.cipherTextForSender,
            nonce: encryptedMessageData.nonce,
          });
          setShouldScroll(true);  
          setMessage("");
        } else {
          toast.error("Please check you internet connection.");
        }
      }
    } catch (e) {
      console.log(e);
      toast.error("Unable to send try after refreshing page.");
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
    <div className="h-[20vh] flex justify-center items-center px-5 bg-[#1b1c24]">
      <div className="flex-1 flex rounded-md items-center justify-center flex-row">
        <div className="flex items-center justify-center flex-row">
          <textarea
            rows={1}
            type="text"
            className="flex-1 resize-none scrollbar-none overflow-y-auto p-4 pr-12 rounded-md w-[70vw] md:w-[50vw] lg:w-[50vw] xl:w-[50vw] bg-[#2c2e3b] text-white placeholder:text-gray-400 border border-[#3a3b45]"
            placeholder="Type a Message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />

          <div className="relative right-10 flex items-center justify-center">
            <button
              onClick={() => setIsEmojiPickerOpend(!isEmojiPickerOpend)}
              className="text-gray-400 hover:text-white transition-all duration-300"
            >
              <RiEmojiStickerLine className="text-2xl" />
            </button>
            {isEmojiPickerOpend && (
              <div ref={emojiPickerRef} className="absolute bottom-16 right-0">
                <EmojiPicker
                  theme="dark"
                  emojiStyle="apple"
                  open={isEmojiPickerOpend}
                  onEmojiClick={handleEmojiClick}
                  autoFocusSearch={false}
                />
              </div>
            )}
          </div>

          <button
            className="bg-purple-700 rounded-md flex items-center justify-center p-4 text-white focus:outline-none transition-all duration-300 hover:bg-purple-900 shadow-md hover:shadow-lg"
            onClick={handleSend}
          >
            <BiSolidSend className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageBar;
