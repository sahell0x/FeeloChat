import React, { useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  // Function to adjust the height of the textarea dynamically
  const handleInput = (e) => {
    e.target.style.height = "auto"; // Reset height
    e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
  };

  return (
    <textarea
      rows={1}
      type="text"
      className="flex-1 resize-none scrollbar-none overflow-y-auto p-4 pr-12 rounded-md w-[70vw] md:w-[50vw] lg:[50vw] xl:w-[50vw] focus:border-none focus:outline-none"
      style={{
        lineHeight: "24px", // Adjust based on your font size
        paddingTop: "12px", // Vertical padding to center text
        paddingBottom: "12px", // Vertical padding to center text
        minHeight: "48px", // Minimum height to ensure consistent padding
      }}
      placeholder="Type a Message..."
      value={message}
      onChange={(e) => {
        setMessage(e.target.value);
        handleInput(e); // Adjust height dynamically
      }}
    />
  );
};

export default ChatInput;