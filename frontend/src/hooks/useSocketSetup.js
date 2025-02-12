import { useEffect, useRef } from "react";
import socket from "@/socket";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedChatDataAtom, selectedChatMessagesAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import onlineStatusAtom from "@/stores/onlineStatusAtom";
import userInfoAtom from "@/stores/userInfoAtom";

const useSocketSetup = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [selectedChatType] = useRecoilState(selectedChatTypeAtom);
  const [selectedChatData] = useRecoilState(selectedChatDataAtom);
  const setSelectedChatMessage = useSetRecoilState(selectedChatMessagesAtom);
  const [onlineStatusState, setOnlineStatusState] = useRecoilState(onlineStatusAtom);

  const selectedChatDataRef = useRef(selectedChatData);
  const selectedChatTypeRef = useRef(selectedChatType);

  useEffect(() => {
    selectedChatDataRef.current = selectedChatData;
    selectedChatTypeRef.current = selectedChatType;
  }, [selectedChatData, selectedChatType]);

  useEffect(() => {
    if (userInfo) {
      socket.connect();

      console.log("connected to the socket server");

      const handleReceiveMessage = (message) => {
        if (
          selectedChatTypeRef.current !== null &&
          (selectedChatDataRef.current?._id === message?.sender ||
            selectedChatDataRef.current?._id === message?.receiver)
        ) {
          setSelectedChatMessage((prev) => [...prev, message]);
        }
      };

      socket.on("receiveMessage", handleReceiveMessage);

      socket.on("status-update", (contactOnlineStatus) => {
        setOnlineStatusState((prev) => ({ ...prev, ...contactOnlineStatus }));
      });

      return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.off("status-update");
        socket.disconnect();
        console.log("disconnected from server");
      };
    }
  }, [userInfo]);
};

export default useSocketSetup;
