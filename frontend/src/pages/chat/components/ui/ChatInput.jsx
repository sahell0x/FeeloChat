import React, { useRef } from "react";

const ChatInput = ({ value, setValue, className = "" }) => {
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    const textarea = textareaRef.current;

    // Reset height to recalculate
    textarea.style.height = "auto";

    // Calculate new height (capped at 150px)
    const newHeight = Math.min(textarea.scrollHeight, 150);
    textarea.style.height = `${newHeight}px`;

    // Enable/disable scroll based on content height
    textarea.style.overflowY = textarea.scrollHeight > 150 ? "scroll" : "hidden";

    // Adjust the textarea's position to grow upwards
    if (textarea.scrollHeight > 0) {
      textarea.style.position = "absolute";
      textarea.style.bottom = "16px"; // Match the padding of the container
    } else {
      textarea.style.position = "static";
    }

    setValue(e.target.value); // Update state
  };

  return (
    <div className={`flex justify-center p-4 relative ${className}`}>
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