import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRecoilValue } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import getFirstLetter from "@/util/getFirstLetter";

export default function ProfileAvatar({image}) {
  const userInfo = useRecoilValue(userInfoAtom);
    const [isHoverd,setIsHoverd] = useState(false);
    console.log("state log");

  return (
    <div
    
    onMouseEnter={()=>setIsHoverd(true)}
        onMouseLeave={()=>setIsHoverd(false)}>

        
      <Avatar className="size-40" >

        {image ? <AvatarImage src="https://github.com/shadcn.png" /> : <AvatarFallback  className="text-6xl">
          {
            userInfo.firstName ? getFirstLetter(userInfo.firstName) : getFirstLetter(userInfo.email)
          }
          </AvatarFallback>}
      </Avatar>
    </div>
  );
}
