import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import onlineStatusAtom from "@/stores/onlineStatusAtom";
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
  const setSelectedChatMessage = useSetRecoilState(selectedChatMessagesAtom);
  const [onlinStatusState,setOnlineStatusState] = useRecoilState(onlineStatusAtom);


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
      });

      socket.current.on("connect", () => {
        console.log("connected to the socket server");
      });

      const handleRecieveMessage = (message) => {
        if (
          selectedChatTypeRef.current !== null &&
          (selectedChatDataRef.current?._id === message?.sender ||
            selectedChatDataRef.current?._id === message?.receiver)
        ) {
            
          setSelectedChatMessage((prev)=>(
              [
                ...prev,
                {
                  ...message,
                  
                }
              ]
          ));

        }
      };

      socket.current.on("status-update", (contactOnlineStatus) => { 
        setOnlineStatusState((prev) => {
          const newState = {
            ...prev,
            ...contactOnlineStatus,
          };
          return newState;
        });
        
      });

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