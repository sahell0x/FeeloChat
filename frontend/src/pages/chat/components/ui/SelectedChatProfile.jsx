import onlineStatusAtom from "@/stores/onlineStatusAtom";
import { useRecoilValue } from "recoil";
import ProfileWrapper from "./ProfileWrapper";
import { Circle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getFirstLetter from "@/util/getFirstLetter";
import { useState } from "react";
import { DialogOverlay } from "@radix-ui/react-dialog";

{
  /* <ProfileWrapper
firstName={selectedChatData.firstName}
lastName={selectedChatData.lastName}
email={selectedChatData.email}
img={selectedChatData.img}
/> */
}

function SelectedChatProfile({ selectedChatData }) {
  const onlineStatusState = useRecoilValue(onlineStatusAtom);
  const [isProfilePhotoDialogOpend, setIsProfilePhotoDialogOpend] =
    useState(false);

  return (
    <div>
      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              onClick={() => {
                setIsProfilePhotoDialogOpend(true);
              }}
            >
              <Avatar className="size-14 border-2 border-[#3a3b45]">
                <AvatarImage src={selectedChatData?.img} />
                <AvatarFallback className="text-2xl bg-[#3a3b45] text-white">
                  {selectedChatData?.firstName
                    ? getFirstLetter(selectedChatData?.firstName)
                    : getFirstLetter(selectedChatData?.email)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
              View profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white">
            {selectedChatData?.firstName
              ? selectedChatData?.firstName + " " + selectedChatData?.lastName
              : "User"}
          </h3>
          <p className="text-sm text-gray-400">{selectedChatData?.email}</p>
        </div>
      </div>
      <Circle
        className={`relative  left-10 bottom-4  z-10 h-3 w-3 ${
          onlineStatusState[selectedChatData?._id]
            ? "fill-green-600 text-green-600"
            : "fill-gray-500 text-gray-500"
        }`}
      />

      <Dialog
        open={isProfilePhotoDialogOpend}
        onOpenChange={setIsProfilePhotoDialogOpend}
      >
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent
          className="border-none rounded-full bg-transparent p-0 flex items-center justify-center h-[200px] w-[200px]"
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center"></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <Avatar className="h-[20rem] w-[20rem] border-2 border-[#3a3b45]">
            <AvatarImage src={selectedChatData?.img} />
            <AvatarFallback className="text-9xl bg-[#3a3b45] text-white">
              {selectedChatData?.firstName
                ? getFirstLetter(selectedChatData?.firstName)
                : getFirstLetter(selectedChatData?.email)}
            </AvatarFallback>
          </Avatar>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SelectedChatProfile;
