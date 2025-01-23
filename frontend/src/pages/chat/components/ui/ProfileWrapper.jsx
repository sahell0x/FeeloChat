import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userInfoAtom from "@/stores/userInfoAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import getFirstLetter from "@/util/getFirstLetter";

function ProfileWrapper() {
  const [userInfo , setUserInfo] = useRecoilState(userInfoAtom);

  return (
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
        {userInfo.firstName ? userInfo.firstName +" "+userInfo.lastName : "User"}
      </h3>
      <p className="text-sm text-gray-400">{userInfo.email}</p>
    </div>
  </div>
  )
}

export default ProfileWrapper;
