import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import userInfoAtom from "@/stores/userInfoAtom";
import { HOST } from "@/util/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const setSelectedMessage = useSetRecoilState(selectedChatMessagesAtom);

  const selectedChatDataRef = useRef(selectedChatData);
  const selectedChatTypeRef = useRef(selectedChatType);

  useEffect(() => {
    selectedChatDataRef.current = selectedChatData;
    selectedChatTypeRef.current = selectedChatType;
  }, [selectedChatData,selectedChatType]);

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });

      socket.current.on("connect", () => {
        console.log("connected to the socket server");
      });

      const handleRecieveMessage = (message) => {
        if (
          selectedChatTypeRef.current !== null &&
          (selectedChatDataRef.current?._id === message.sender?._id ||
            selectedChatDataRef.current?._id === message.receiver?._id)
        ) {
          console.log("received message :", message);

          setSelectedMessage((prev)=>{
              [
                ...prev,
                {
                  ...message,
                  receiver:message.receiver?._id,
                  sender:message.sender?._id,

                }
              ]
          });

        }
      };

      socket.current.on("receiveMessage", (message) => {
        console.log(message);
        handleRecieveMessage(message);
      });

      return () => {
        socket.current.disconnect();
        console.log("disconnected from server");
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};