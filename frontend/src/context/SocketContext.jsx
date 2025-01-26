import  { selectedChatDataAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import userInfoAtom from "@/stores/userInfoAtom";
import { HOST } from "@/util/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const userInfo = useRecoilValue(userInfoAtom);
  const [selectedChatType, setSelectedChatType] = useRecoilState(selectedChatTypeAtom);
  const [selectedChatData, setSelectedChatData] = useRecoilState(selectedChatDataAtom);
  useEffect(() => {
    console.log("inside useEffect");
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to the socket server");
      });

      const handleRecieveMessage = (message) => {
        console.log("this is the message",message);

        console.log("this is the message",selectedChatData);

        if (
          selectedChatType !== null &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.reciever._id)
        ) {
          
        console.log("recived messae :",message);
      };

      socket.current.on("receiveMessage", (message)=>{
        console.log("a message recieved");
        handleRecieveMessage(message)
      });

      return () => {
        socket.current.disconnect();
        console.log("disconnected from server");
      };
    }

  }}, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
