import React from "react";

function Modal({ children }) {
  return (
    <div className="flex justify-center items-center h-[90vh] w-[100vw]">
      <div className="flex justify-center items-center bg-[#2c2e3b] border-2 border-[#3a3b45] shadow-2xl h-[80vh] w-[90vw] text-white text-opacity-90 rounded-3xl md:w-[90vw] lg:w-[70vw] xl:w-[40vw]">
        {children}
      </div>
    </div>
  );
}

export default Modal;