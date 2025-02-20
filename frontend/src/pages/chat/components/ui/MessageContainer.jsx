import React, { useEffect, useRef, useState } from "react";
import "../../../../App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import moment from "moment";
import apiClient from "@/lib/api-client";
import {  MESSAGE_ROUTE } from "@/util/constants";
import privateKeyAtom from "@/stores/privateKeyAtom";
import {
  decryptMessageForReceiver,
  decryptMessageForSender,
} from "@/encryption/cryptoUtils";
import userInfoAtom from "@/stores/userInfoAtom";
import { ClipLoader } from "react-spinners";
import messagePageAtom from "@/stores/messagePageAtom";
import unreadMessageCountAtom from "@/stores/unreadMessageCountAtom";
import messageSeenTrackerAtom from "@/stores/messsageSeenTrackerAtom";
import socket from "@/socket";

function MessageContainer({ shouldScroll, setShouldScroll }) {
  const [selectedChatMessages, setSelectedChatMessages] = useRecoilState(
    selectedChatMessagesAtom
  );
  const selectedChatData = useRecoilValue(selectedChatDataAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);
  const messageSeenTrack = useRecoilValue(messageSeenTrackerAtom);
  const [unReadMessageCounts, setUnReadMessageCounts] = useRecoilState(
    unreadMessageCountAtom
  );
  const privateKey = useRecoilValue(privateKeyAtom);
  const userInfo = useRecoilValue(userInfoAtom);
  const [lastContainerHeight, setLastContainerHeight] = useState(0);

  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useRecoilState(messagePageAtom);
  const limit = 10;

  const handleDecryptMessage = (message) => {
    try {
      if (message.sender !== selectedChatData._id) {
        return decryptMessageForSender(
          message.cipherTextForSender,
          message.nonce,
          userInfo.publicKey,
          privateKey
        );
      } else {
        return decryptMessageForReceiver(
          message.cipherTextForReceiver,
          message.nonce,
          selectedChatData.publicKey,
          privateKey
        );
      }
    } catch (e) {
      console.log(e);
      return "𝘤𝘰𝘳𝘳𝘶𝘱𝘵𝘦𝘥 𝘮𝘦𝘴𝘴𝘢𝘨𝘦";
    }
  };

  const fetchMessages = async (isInitial = false) => {
    if (loading || (!hasMore && !isInitial)) return;

    setLoading(true);
    try {
      const response = await apiClient.get(
        `${MESSAGE_ROUTE}?_id=${selectedChatData._id}&limit=${limit}&skip=${
          page * limit
        }`,
        { withCredentials: true }
      );


      const newMessages = response.data.messages;

      if (newMessages.length < limit) {
        setHasMore(false);
      }

      if (isInitial) {
        setSelectedChatMessages([...newMessages]);
      } else {
        setSelectedChatMessages((prevMessages) => [
          ...newMessages,
          ...prevMessages,
        ]);
      }
      setPage((prevPage) => prevPage + 1);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const handleMarkAsRead = async (id) => {
    try {
        socket.emit("message-seen",{
          to:id,
        });
    } catch (e) {
      console.log(e);
    }
  };

  // Initial fetch when chat is selected
  useEffect(() => {
    setLastContainerHeight(0);
    setHasMore(true);

    if (selectedChatData?._id && selectedChatType === "contact") {
      fetchMessages(true);
      handleMarkAsRead(selectedChatData?._id);

      if (unReadMessageCounts[selectedChatData?._id]) {
        setUnReadMessageCounts((pre) => {
          const tem = {
            ...pre,
          };

          tem[selectedChatData?._id] = 0;

          return tem;
        });
      }
    }

    return () => {
      setSelectedChatMessages([]);
    };
  }, [selectedChatData, selectedChatType]);

  // Handle scroll to load more
  const handleScroll = () => {
    if (!containerRef.current) return;

    const { scrollTop } = containerRef.current;

    if (scrollTop === 0 && hasMore && !loading) {
      setLastContainerHeight(containerRef.current.scrollHeight);
      setShouldScroll(false);
      fetchMessages();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (containerRef.current && shouldScroll) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    } else {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - lastContainerHeight;
    }
  }, [selectedChatMessages, shouldScroll]);

  const renderDm = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      <div
        className={`${
          message.sender !== selectedChatData._id
            ? "bg-purple-700 text-white rounded-l-2xl rounded-br-2xl"
            : "bg-[#2c2e36] text-[#e5e5e5] rounded-r-2xl rounded-bl-2xl"
        } inline-block p-4  my-1 max-w-[50%] break-words`}
      >
        {handleDecryptMessage(message)}
      </div>
      <div className="text-xs text-gray-400">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderMessages = () => {
    let lastData = null;
    return selectedChatMessages.map((message, index) => {
      if (
        selectedChatData?._id == message?.receiver ||
        selectedChatData?._id == message?.sender
      ) {
        const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
        const showData = messageDate !== lastData;
        lastData = messageDate;

        return (
          <div key={index}>
            {showData && (
              <div className="text-center text-gray-500 my-2">
                {moment(message.timestamp).format("LL")}
              </div>
            )}
            {selectedChatType === "contact" && renderDm(message)}
          </div>
        );
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scroll-smooth h-[75vh] bg-[#1b1c24] text-white scrollbar-none scrollbar-thumb-[#3a3b45] scrollbar-track-transparent hover:scrollbar-thumb-[#4c4d5c] w-[100vw] pb-11 p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]"
    >
      {loading && (
        <div className="text-center">
          <ClipLoader color="#ffffff" />
        </div>
      )}
      {renderMessages()}

      {messageSeenTrack[selectedChatData?._id] ? (
        <div className="text-right text-gray-500 text-lg">seen</div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MessageContainer;
