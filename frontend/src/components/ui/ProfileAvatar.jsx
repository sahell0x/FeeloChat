import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileAvatar() {
    const [isHoverd,setIsHoverd] = useState(false);
  return (
    <div onMouseEnter={()=>setIsHoverd(true)}
        onMouseLeave={()=>setIsHoverd(false)}>
        
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
