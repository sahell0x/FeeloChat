import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilValue } from "recoil";
import { ImageOff } from "lucide-react";
import getFirstLetter from "@/util/getFirstLetter";
import { FiEdit2 } from "react-icons/fi";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

function UserProfileInfo() {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  return (
    <div className="w-full h-18 bg-[#2c2e3b] rounded-md p-3 flex items-center justify-between flex-row border border-[#3a3b45] hover:bg-[#3a3b45] transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-4">
        <Avatar className="size-14 border-2 border-[#3a3b45]">
          <AvatarImage src={userInfo.img} />
          <AvatarFallback className="text-2xl bg-[#3a3b45] text-white">
            {userInfo.firstName
              ? getFirstLetter(userInfo.firstName)
              : getFirstLetter(userInfo.email)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">
            {userInfo.firstName || "User"}
          </h3>
          <p className="text-sm text-gray-400">{userInfo.email}</p>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2 className="text-purple-500 hover:text-purple-700" 
            onClick={()=>navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
            Edit Profile
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default UserProfileInfo;
