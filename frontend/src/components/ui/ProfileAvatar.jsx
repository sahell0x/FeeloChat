import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import getFirstLetter from "@/util/getFirstLetter";
import apiClient from "@/lib/api-client";
import { USER_PROFILE_ROUTE } from "@/util/constants";
import fileToBase64Convertor from "@/util/fileToBase64Converter";
import { useToast } from "@/hooks/use-toast";
export default function ProfileAvatar({ profileImage ,setProfileImage }) {
  const userInfo = useRecoilValue(userInfoAtom);
  const [isHoverd, setIsHoverd] = useState(false);
  const inputFileRef = useRef(null);
  const {toast} = useToast();

  const handleFileInputClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = async(e) => {
    console.dir(e.target.files[0]);
    const file = e.target.files[0];
    if(file){
      try{
        const imageUrl = await fileToBase64Convertor(file);
        const response = await apiClient.post(USER_PROFILE_ROUTE,{img:imageUrl},{withCredentials:true});
        if(response.status===200){
          setProfileImage(imageUrl);
          toast({variant: "success",
            title: "Profile image uploaded successfully.",});
        }

      }catch{
        toast({variant: "destructive",
          title: "Error while setting image.",});
      }
    }
  };

  const handleImageDelete = () => {};
  return (
    <div
      className="  flex items-center justify-center flex-col"
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <Avatar className="size-40">
        {profileImage ? (
          <AvatarImage src={profileImage} />
        ) : (
          <AvatarFallback className="text-6xl">
            {userInfo.firstName
              ? getFirstLetter(userInfo.firstName)
              : getFirstLetter(userInfo.email)}
          </AvatarFallback>
        )}
        {isHoverd && (
          <div
            onClick={profileImage ? handleImageDelete : handleFileInputClick}
            className=" absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer size-42"
          >
            {profileImage ? (
              <FaTrashAlt className="text-gray-200 text-3xl cursor-pointer hover:text-white" />
            ) : (
              <FaPlus className="text-gray-200 text-3xl cursor-pointer hover:text-white" />
            )}
          </div>
        )}
      </Avatar>
      <input
        type="file"
        ref={inputFileRef}
        accept=".png, .jpg, .jpeg, .svg , .webp"
        className="hidden"
        onChange={handleImageChange}
        name="profile-image"
      />

    </div>
  );
}
