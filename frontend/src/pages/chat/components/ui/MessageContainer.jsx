import React, { useEffect, useRef } from "react";
import "../../../../App.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import moment from "moment";
import apiClient from "@/lib/api-client";
import { MESSAGE_ROUTE } from "@/util/constants";

function MessageContainer() {


  const [selectedChatMessages, setSelectedChatMessages] = useRecoilState(
    selectedChatMessagesAtom
  );

  const selectedChatData = useRecoilValue(selectedChatDataAtom);
  const selectedChatType = useRecoilValue(selectedChatTypeAtom);

  const containerRef = useRef(null);

  const renderDm = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      }`}
    >
      <div
        className={`${
          message.sender !== selectedChatData._id
            ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
            : "bg-[#2a2b33]/5 text-white/80  border-white/20"
        } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
      >
        {message.content}
      </div>
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderMessages = () => {
    let lastData = null;

    return selectedChatMessages.map((message, index) => {
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
    });
  };

//this effect  is for fetch messages when ever a chat is selected

  useEffect(()=>{

    const getMessages = async ()=>{
          try{

            const response = await apiClient.get(`${MESSAGE_ROUTE}?_id=${selectedChatData._id}`,{withCredentials:true});

            setSelectedChatMessages(response.data.messages);

          }catch(e){
            console.log(e);
          }
    }
     
    if(selectedChatData._id && selectedChatType==="contact"){
      getMessages();
    }

  },[selectedChatData,selectedChatType]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [selectedChatMessages]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scroll-smooth h-[75vh] bg-[#1b1c24] text-white scrollbar-none scrollbar-thumb-[#3a3b45] scrollbar-track-transparent hover:scrollbar-thumb-[#4c4d5c] w-[100vw] pb-11 p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]"
    >
      {renderMessages()}
    </div>
  );
}

export default MessageContainer;
