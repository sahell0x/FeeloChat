import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import getFirstLetter from "@/util/getFirstLetter";

function ProfileWrapper({firstName , lastName, img , email}) {
  return (
    <div className="flex items-center gap-4">
    <Avatar className="size-14 border-2 border-[#3a3b45]">
      <AvatarImage src={img} />
      <AvatarFallback className="text-2xl bg-[#3a3b45] text-white">
        {firstName
          ? getFirstLetter(firstName)
          : getFirstLetter(email)}
      </AvatarFallback>
    </Avatar>
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-white">
        {firstName ? firstName +" "+lastName : "User"}
      </h3>
      <p className="text-sm text-gray-400">{email}</p>
    </div>
  </div>
  )
}

export default ProfileWrapper;
