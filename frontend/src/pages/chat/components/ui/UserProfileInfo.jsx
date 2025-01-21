import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from '@/stores/userInfoAtom';
import { useRecoilValue } from 'recoil';
import { ImageOff } from 'lucide-react';
import getFirstLetter from '@/util/getFirstLetter';

function UserProfileInfo() {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <div className='w-full h-18 bg-white rounded-md p-2 flex items-center justify-between flex-row'>
       <Avatar className="size-14">
       
       <AvatarImage src={userInfo.img} />
     
       <AvatarFallback className="text-2xl">
         {userInfo.firstName
           ? getFirstLetter(userInfo.firstName)
           : getFirstLetter(userInfo.email)}
       </AvatarFallback>
   </Avatar>
    </div>
  )
}

export default UserProfileInfo;
