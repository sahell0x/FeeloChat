import React, { useState } from "react";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { FiEdit2 } from "react-icons/fi";
import { TbLogout } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import apiClient from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/util/constants";
import toast from "react-hot-toast";
import ProfileWrapper from "./ProfileWrapper";
import { deletePrivateKey } from "@/db/indexedDB";
import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import onlineStatusAtom from "@/stores/onlineStatusAtom";
import recentContactAtom from "@/stores/recentContactAtom";
import typingTrackerAtom from "@/stores/typingTrackerAtom";
import shouldScrollAtom from "@/stores/shouldScrollAtom";
import showExpressionsAtom from "@/stores/showExpressionsAtom";
import unreadMessageCountAtom from "@/stores/unreadMessageCountAtom";
import messageSeenTrackerAtom from "@/stores/messsageSeenTrackerAtom";
import messagePageAtom from "@/stores/messagePageAtom";
import recentContactDataAtom from "@/stores/recentContactDataAtom";
import currentExpressionAtom from "@/stores/currentExpressionAtom";

function UserProfileInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const resetSelectedChatTypeAtom = useResetRecoilState(selectedChatTypeAtom);
  const resetSelectedChatDataAtom = useResetRecoilState(selectedChatDataAtom);
  const resetSelectedChatMessagesAtom = useResetRecoilState(
    selectedChatMessagesAtom
  );
  const resetTypingTrack = useResetRecoilState(typingTrackerAtom);
  const resetShouldScroll = useResetRecoilState(shouldScrollAtom);
  const resetShowExpressions = useResetRecoilState(showExpressionsAtom);
  const resetUnreadMessageCounts = useResetRecoilState(unreadMessageCountAtom);
  const resetMessageSeenTrack = useResetRecoilState(messageSeenTrackerAtom);
  const resetMessagePage = useResetRecoilState(messagePageAtom);
  const resetRecentContacts = useResetRecoilState(recentContactAtom);
  const resetRecentContactData = useResetRecoilState(recentContactDataAtom);
  const resetCurrentExpression = useResetRecoilState(currentExpressionAtom);

  const resetOnlineStatusAtom = useResetRecoilState(onlineStatusAtom);
  const resetRecentContactAtom = useResetRecoilState(recentContactAtom);

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await apiClient.post(
        LOGOUT_ROUTE,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        await deletePrivateKey();

        setUserInfo(null);
        resetSelectedChatTypeAtom();
        resetSelectedChatDataAtom();
        resetSelectedChatMessagesAtom();
        resetOnlineStatusAtom();
        resetRecentContactAtom();
        resetTypingTrack();
        resetShouldScroll();
        resetUnreadMessageCounts();
        resetShowExpressions();
        resetMessageSeenTrack();
        resetMessagePage();
        resetRecentContactData();
        resetRecentContacts();
        resetCurrentExpression();

        toast.success("Logout successfully.");
        navigate("/");
      } else {
        toast.error("Unable to Logout please try again.");
      }
    } catch {
      toast.error("Unable to Logout please try again.");
    }
  };

  return (
    <div className="w-full h-18 bg-[#2c2e3b] rounded-md p-3 flex items-center justify-between flex-row border border-[#3a3b45] hover:bg-[#3a3b45] transition-all duration-300 cursor-pointer">
      <ProfileWrapper
        firstName={userInfo.firstName}
        lastName={userInfo.lastName}
        email={userInfo.email}
        img={userInfo.img}
        id={userInfo.id}
      />
      <div className="flex items-center justify-center flex-row gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-xl hover:text-purple-700"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <TbLogout
                className="text-red-500 text-xl hover:text-red-600"
                onClick={handleLogOut}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default UserProfileInfo;
