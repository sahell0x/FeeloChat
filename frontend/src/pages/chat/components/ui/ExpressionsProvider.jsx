import React, { useEffect, useRef, useState } from "react";
import "../../../../App.css";
import Happy from "@/components/emojis/Happy";
import Disgusted from "@/components/emojis/Disgusted";
import Fearful from "@/components/emojis/Fearful";
import Sad from "@/components/emojis/Sad";
import Neutral from "@/components/emojis/Neutral";
import Angry from "@/components/emojis/Angry";
import Surprised from "@/components/emojis/Surprised";

import { useRecoilValue } from "recoil";
import currentExpressionAtom from "@/stores/currentExpressionAtom";

function ExpressionsProvider() {
  const currentExpression = useRecoilValue(currentExpressionAtom);
  const [isChanging, setIsChanging] = useState(false);

  let currentEmojiRef = useRef(null);

  const emojis = {
    sad: Sad,
    angry: Angry,
    happy: Happy,
    disgusted: Disgusted,
    fearful: Fearful,
    neutral: Neutral,
    surprised: Surprised,
  };

  useEffect(() => {
    setIsChanging(true);

    setTimeout(() => {
      currentEmojiRef.current = emojis[currentExpression];
      setIsChanging(false);
    }, 200);
  }, [currentExpression]);

  return (
    <div className="w-full pl-5 pr-10 pb-3 flex items-center justify-between flex-row">
      <div
        className={`filter drop-shadow-lg inline-block  ${
          isChanging ? "animate-emoji-exit" : "animate-emoji-enter"
        }`}
      >
        {currentExpression && currentEmojiRef.current ? (
          <currentEmojiRef.current />
        ) : (
          <div className="h-[40px] w-[40px]"></div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ExpressionsProvider);
