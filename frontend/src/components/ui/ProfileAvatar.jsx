import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import getFirstLetter from "@/util/getFirstLetter";
import apiClient from "@/lib/api-client";
import { USER_PROFILE_ROUTE } from "@/util/constants";
import fileToBase64Convertor from "@/util/fileToBase64Converter";
import toast from "react-hot-toast";
export default function ProfileAvatar({ profileImage ,setProfileImage }) {
  const userInfo = useRecoilValue(userInfoAtom);
  const [isHoverd, setIsHoverd] = useState(false);
  const inputFileRef = useRef(null);

  const handleFileInputClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if(file){
      try{
       const imageUrl = await fileToBase64Convertor(file);
       setProfileImage(imageUrl);

        const response = await apiClient.patch(USER_PROFILE_ROUTE,{img:imageUrl},{withCredentials:true});

        if(response.status===202){

          toast.success("Profile image uploaded successfully.");
        }

      }catch(e){
        console.log(e);
          toast.error("Error while setting image.");
      }
    }
  };

  const handleImageDelete = async () => {
    try{
      const response = await apiClient.patch(USER_PROFILE_ROUTE,{img:""},{withCredentials:true});

      if(response.status===202){
        toast.success("Profile image deleted successfully.");
      }

    }catch{
      toast.error("Error while deleting image.");
    }
  };
  return (
    <div
      className="  flex items-center justify-center flex-col"
      onMouseEnter={() => setIsHoverd(true)}
      onMouseLeave={() => setIsHoverd(false)}
    >
      <Avatar className="size-40">
       
          <AvatarImage src={profileImage} />
        
          <AvatarFallback className="text-6xl">
            {userInfo.firstName
              ? getFirstLetter(userInfo.firstName)
              : getFirstLetter(userInfo.email)}
          </AvatarFallback>
      
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
      {/* <img src={profileImage} alt="profileimg" /> */}

    </div>
  );
}
