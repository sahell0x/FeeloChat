import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AlertDialogComponent = ({ content }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false); // Close the dialog
  };

  return (
    <>
      {/* Conditionally Render Blurred Background */}
      {isOpen && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-50" />
      )}

      {/* Centered Dialog */}
      <AlertDialog open={isOpen} onOpenChange={handleClose}>
        <AlertDialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2c2e3b] border-[#3a3b45] text-white rounded-lg shadow-lg z-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Alert</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {content}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={handleClose}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AlertDialogComponent;