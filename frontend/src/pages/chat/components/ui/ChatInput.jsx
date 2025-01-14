import React, { useRef } from "react";

const ChatInput = ({ value, setValue, className = "" }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust to content height

    // Check if the content exceeds the max height
    if (textarea.scrollHeight > 150) {
      textarea.style.overflowY = "scroll"; // Enable vertical scroll
      textarea.style.height = "80px"; // Cap height at 150px
    } else {
      textarea.style.overflowY = "hidden"; // Hide scroll
    }

    setValue(e.target.value); // Update state
  };

  return (
    <div className={`flex justify-center p-4 ${className}`}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder="Type a message..."
        className={`w-full max-w-lg p-3 border scrollbar-none border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden ${className}`}
        rows={1}
        style={{
          maxHeight: "150px", // Set maximum height
        }}
      />
    </div>
  );
};

export default ChatInput;
