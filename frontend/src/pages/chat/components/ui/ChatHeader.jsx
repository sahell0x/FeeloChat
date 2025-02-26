import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import { RiCloseFill } from "react-icons/ri";
import { useRecoilValue, useResetRecoilState } from "recoil";
import ExpressionButton from "@/components/ui/ExpressionButton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import showExpressionsAtom from "@/stores/showExpressionsAtom";
import useFace from "@/hooks/useFace";
import { useEffect } from "react";
import socket from "@/socket";
import SelectedChatProfile from "./SelectedChatProfile";

function ChatHeader() {
  const selectedChatDataReset = useResetRecoilState(selectedChatDataAtom);
  const selectedChatTypeReset = useResetRecoilState(selectedChatTypeAtom);
  const selectedChatMessageReset = useResetRecoilState(
    selectedChatMessagesAtom
  );
  const showExpressionsReset = useResetRecoilState(showExpressionsAtom);
  const selectedChatData = useRecoilValue(selectedChatDataAtom);


  const expression = useFace();

  useEffect(() => {
    const expressionData = {
      to: selectedChatData._id,
      expression: expression,
    };
    socket.emit("expression", expressionData);
  }, [expression]);

  return (
    <div className="h-[10vh] border-b-2 pt-3 border-[#3a3b45] flex items-center justify-between px-4 bg-[#1b1c24] md:px-20">
      <SelectedChatProfile selectedChatData={selectedChatData}/>
      <div className="flex gap-2 items-center md:gap-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <ExpressionButton />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
              Share expressions
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex gap-3 items-center justify-between"></div>
        <div className="flex items-center justify-center gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <button
                    onClick={() => {
                      selectedChatDataReset();
                      selectedChatTypeReset();
                      selectedChatMessageReset();
                      showExpressionsReset();
                    }}
                    className="text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <RiCloseFill className="text-3xl" />
                  </button>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-[#2c2e3b] border border-[#3a3b45] text-white text-sm p-2 rounded-lg shadow-lg">
                Close
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
