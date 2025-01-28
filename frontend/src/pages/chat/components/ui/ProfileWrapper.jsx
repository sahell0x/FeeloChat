import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getFirstLetter from "@/util/getFirstLetter";
import { Circle } from "lucide-react";


function ProfileWrapper({firstName , lastName, img , email}) {
  return (
    <div className="flex items-center gap-4">
      <div>
    <Avatar className="size-14 border-2 border-[#3a3b45]">
      <AvatarImage src={img} />
      <AvatarFallback className="text-2xl bg-[#3a3b45] text-white">
        {firstName
          ? getFirstLetter(firstName)
          : getFirstLetter(email)}
      </AvatarFallback>
    </Avatar>
    <Circle
            className={`relative  left-10 bottom-4  z-10 h-4 w-4 ${
              
              false
                ? "fill-green-600 text-green-600"
                : "fill-gray-500 text-gray-500"
            }`}
          />
          </div>
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
