import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilValue } from "recoil";
import { ImageOff } from "lucide-react";
import getFirstLetter from "@/util/getFirstLetter";

function UserProfileInfo() {
  const userInfo = useRecoilValue(userInfoAtom);

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
      <div className="text-gray-400 hover:text-white transition-all duration-300">
        <ImageOff className="size-5" />
      </div>
    </div>
  );
}

export default UserProfileInfo;