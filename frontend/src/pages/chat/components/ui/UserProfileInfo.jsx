import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilValue } from "recoil";
import getFirstLetter from "@/util/getFirstLetter";
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

function UserProfileInfo() {
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();

  const handleLogOut = async ()=>{
     try{
      const response = await apiClient(LOGOUT_ROUTE,{withCredentials:true});

      if(response.status === 200){
        toast.success("Logout successfully.");
        navigate("/");
      }else{
        toast.error("Unable to Logout please try again.");
      }
     }catch{
      toast.error("Unable to Logout please try again.");
     }
  }

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
      <div className="flex items-center justify-center flex-row gap-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FiEdit2 className="text-purple-500 text-xl hover:text-purple-700" 
            onClick={()=>navigate("/profile")}
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
            <TbLogout className="text-red-500 text-xl hover:text-red-600" 
            
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
