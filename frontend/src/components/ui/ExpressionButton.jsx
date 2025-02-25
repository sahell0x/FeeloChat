import React, { useEffect, useState } from "react";
import Happy from "../emojis/Happy";
import Sad from "../emojis/Sad";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import showExpressionsAtom from "@/stores/showExpressionsAtom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ExpressionButton() {
  const [showExpressions, setShowExpressions] =
    useRecoilState(showExpressionsAtom);
  const [isDialogOpend,setIsDialogOpend] =  useState(false);

  const checkAndRequestCameraPermission = async () => {
    try {
      if (showExpressions) {
        setShowExpressions(false);
        return;
      }
      const permission = await navigator.permissions.query({ name: "camera" });

      if (permission.state === "granted") {
        toast.success("Camera is in Access");
        setShowExpressions(true);
        return;
      }

      if (permission.state === "denied") {
        toast.error("You have blocked permission. Please reset it manually.");
        setShowExpressions(false);
        return;
      }

      // Request permission if not granted
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // Cleanup
      setIsDialogOpend(true);
      setShowExpressions(true);
      toast.success("Camera permission granted");
    } catch (err) {
      setShowExpressions(false);

      if (err.name === "NotAllowedError") {
        toast.error("Camera permission denied");
      } else if (err.name === "NotFoundError") {
        toast.error("Camera not found");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    let permissionStatusRef;

    const monitorPermissionChange = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "camera",
        });
        permissionStatusRef = permissionStatus;

        const handlePermissionChange = () => {
          if (permissionStatus.state === "denied") {
            toast.error("Camera permission was revoked.");
            setShowExpressions(false);
          }
        };

        permissionStatus.addEventListener("change", handlePermissionChange);

        return () => {
          permissionStatus.removeEventListener(
            "change",
            handlePermissionChange
          );
        };
      } catch (err) {
        console.error("Failed to monitor camera permission:", err);
      }
    };

    monitorPermissionChange();

    return () => {
      if (permissionStatusRef) {
        permissionStatusRef.removeEventListener("change", () => {});
      }
    };
  }, []);

  return (
    <div>
      <button
        onClick={checkAndRequestCameraPermission}
        className={`flex items-center space-x-2 px-3 py-1.5 text-white/90 rounded-full transition-all duration-200 ${
          showExpressions
            ? "bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
            : "bg-gray-500 hover:bg-gray-600"
        }`}
        aria-label={
          showExpressions ? "Disable expressions" : "Enable expressions"
        }
      >
        {showExpressions ? (
          <>
            <Happy width={20} height={20} />
            <span className="text-sm">On</span>
          </>
        ) : (
          <>
            <Sad width={20} height={20} />
            <span className="text-sm">Off</span>
          </>
        )}
      </button>

      <Dialog open={isDialogOpend} onOpenChange={setIsDialogOpend}>
  <DialogContent className="bg-[#181920] border-none text-white w-[350px] md:w-[400px] p-6 rounded-lg">
    <DialogHeader className="text-center">
      <DialogTitle className="text-lg font-semibold">
        Privacy & Accuracy Notice
      </DialogTitle>
    </DialogHeader>

    <DialogDescription className="text-sm text-white/80 text-center leading-relaxed mt-2">
      All image processing happens on your device. We only share your detected 
      expression, not your data. Detection may not always be accurate, so 
      face-to-face conversations are always recommended.
    </DialogDescription>

    <div className="flex justify-center mt-4">
      <button
        onClick={() => setIsDialogOpend(false)}
        className="px-4 py-2 bg-purple-700 hover:bg-purple-900 transition rounded-md text-sm"
      >
        Got it
      </button>
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
}

export default ExpressionButton;
