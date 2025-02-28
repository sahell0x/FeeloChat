import { useEffect, useRef } from "react";
import socket from "@/socket";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import onlineStatusAtom from "@/stores/onlineStatusAtom";
import userInfoAtom from "@/stores/userInfoAtom";
import recentContactAtom from "@/stores/recentContactAtom";
import recentContactDataAtom from "@/stores/recentContactDataAtom";
import getContactInfo from "@/util/getContactInfo";
import unreadMessageCountAtom from "@/stores/unreadMessageCountAtom";
import messageSeenTrackerAtom from "@/stores/messsageSeenTrackerAtom";
import shouldScrollAtom from "@/stores/shouldScrollAtom";
import typingTrackerAtom from "@/stores/typingTrackerAtom";
import currentExpressionAtom from "@/stores/currentExpressionAtom";

const useSocketSetup = () => {
  const userInfo = useRecoilValue(userInfoAtom);
  const [selectedChatType] = useRecoilState(selectedChatTypeAtom);
  const [selectedChatData] = useRecoilState(selectedChatDataAtom);
  const setSelectedChatMessage = useSetRecoilState(selectedChatMessagesAtom);
  const setMessageSeenTrack = useSetRecoilState(messageSeenTrackerAtom);
  const setOnlineStatusState = useSetRecoilState(onlineStatusAtom);
  const [recentContactList, setRecentContactList] =
    useRecoilState(recentContactAtom);
  const [recentContactData, setRecentContactData] = useRecoilState(
    recentContactDataAtom
  );

  const setCurrentExpression = useSetRecoilState(currentExpressionAtom);

  const setTypingTracker = useSetRecoilState(typingTrackerAtom);

  const setUnreadMessageCount = useSetRecoilState(unreadMessageCountAtom);
  const setShouldScroll = useSetRecoilState(shouldScrollAtom);

  const selectedChatDataRef = useRef(selectedChatData);
  const selectedChatTypeRef = useRef(selectedChatType);
  const recentContactDataRef = useRef(recentContactData);
  const recentContactListRef = useRef(recentContactList);

  useEffect(() => {
    selectedChatDataRef.current = selectedChatData;
    selectedChatTypeRef.current = selectedChatType;
    recentContactDataRef.current = recentContactData;
    recentContactListRef.current = recentContactList;
  }, [
    selectedChatData,
    selectedChatType,
    recentContactData,
    recentContactList,
  ]);

  useEffect(() => {
    if (userInfo) {
      const handleReceiveMessage = async (message) => {
        const contactId =
          message?.sender === userInfo?.id ? message.receiver : message.sender;

        const IS_SENT = message?.sender == userInfo?.id;

        const INVALID_IDX = -1;
        const DELETE_COUNT = 1;
        const ONE_MSG_COUNT = 1;
        const IS_SEEN = false;

        setMessageSeenTrack((pre) => {
          const tem = {
            ...pre,
          };

          tem[contactId] = IS_SEEN;

          return tem;
        });

        if (
          selectedChatTypeRef.current !== null &&
          selectedChatDataRef.current?._id === contactId
        ) {
          setShouldScroll(true);
          setSelectedChatMessage((prev) => [...prev, message]);

          if (!IS_SENT) {
            socket.emit("message-seen", {
              to: message.sender,
              for: message.receiver,
            });
          }
        }

        if (recentContactDataRef.current[contactId]) {
          setRecentContactData((pre) => {
            const tem = {
              ...pre,
            };

            tem[contactId] = {
              ...pre[contactId],

              isSent: IS_SENT,

              nonce: message?.nonce,

              lastMessage: IS_SENT
                ? message?.cipherTextForSender
                : message?.cipherTextForReceiver,
            };

            return tem;
          });
          const newRecentContactList = [...recentContactListRef.current];
          const index = newRecentContactList.indexOf(contactId);

          if (index != INVALID_IDX) {
            newRecentContactList.splice(index, DELETE_COUNT);
            newRecentContactList.unshift(contactId);

            setRecentContactList(newRecentContactList);
          }

          if (selectedChatDataRef.current?._id !== contactId) {
            setUnreadMessageCount((pre) => {
              const tem = {
                ...pre,
              };

              tem[contactId] = pre[contactId] + ONE_MSG_COUNT;

              return tem;
            });
          }
        } else {
          socket.emit("online-status-new-message", {
            statusOf: contactId,
          });

          const contactData = await getContactInfo(contactId);

          if (contactData) {
            if (!IS_SENT) {
              setUnreadMessageCount((pre) => {
                const tem = {
                  ...pre,
                };

                tem[contactId] = ONE_MSG_COUNT;

                return tem;
              });
            }

            setRecentContactData((pre) => {
              const tem = {
                ...pre,
              };

              const isSent = message?.sender == userInfo?.id;

              tem[contactId] = {
                publicKey: contactData.publicKey,
                img: contactData.img,
                email: contactData.email,
                id: contactData.id,
                isGuest: contactData.isGuest,
                firstName: contactData.firstName,
                lastName: contactData.lastName,
                isSent: isSent,
                nonce: message?.nonce,
                lastMessage: isSent
                  ? message?.cipherTextForSender
                  : message?.cipherTextForReceiver,
              };

              return tem;
            });

            setRecentContactList((pre) => {
              return [contactId, ...pre];
            });
          }
        }
      };

      const handleMessageSeen = (data) => {
        const IS_SEEN = true;

        setMessageSeenTrack((pre) => {
          const tem = {
            ...pre,
          };
          tem[data.seenBy] = IS_SEEN;
          return tem;
        });
      };

      const handleStatusUpdate = (contactOnlineStatus) => {
        setOnlineStatusState((pre) => {
          return { ...pre, ...contactOnlineStatus };
        });
      };

      const handleIndivisualStatus = (indivisualStatus) => {
        setOnlineStatusState((pre) => {
          return {
            ...pre,
            ...indivisualStatus,
          };
        });
      };

      const handleTypingEvent = (data) => {
        setTypingTracker((pre) => {
          return {
            ...pre,
            ...data,
          };
        });
      };

      const handleExpression = (expressionEventData) => {
        if (expressionEventData.sender === selectedChatDataRef.current?._id) {
          setCurrentExpression(expressionEventData.expression);
        }
      };

      socket.on("status-update", handleStatusUpdate);

      socket.on("receive-message", handleReceiveMessage);

      socket.on("message-seen", handleMessageSeen);

      socket.on("online-status-new-message", handleIndivisualStatus);

      socket.on("typing", handleTypingEvent);

      socket.on("expression", handleExpression);

      socket.connect();

      return () => {
        socket.off("receive-message", handleReceiveMessage);
        socket.off("status-update", handleStatusUpdate);
        socket.off("message-seen", handleMessageSeen);
        socket.off("online-status-new-message", handleIndivisualStatus);
        socket.off("typing", handleTypingEvent);
        socket.off("expression", handleExpression);

        socket.disconnect();
      };
    }
  }, [userInfo]);
};

export default useSocketSetup;
