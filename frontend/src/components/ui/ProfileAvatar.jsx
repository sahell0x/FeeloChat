import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import getFirstLetter from "@/util/getFirstLetter";

export default function ProfileAvatar({ profileImage }) {
  const userInfo = useRecoilValue(userInfoAtom);
  const [isHoverd, setIsHoverd] = useState(false);
  const inputFileRef = useRef(null);

  const handleFileInputClick = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = (e) => {
    alert("image changed successfull");
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
