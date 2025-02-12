import { ClipLoader, PulseLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import useCountdownTimer from "@/hooks/useCountDownTimer";
import formatTime from "@/util/formatTime";
import apiClient from "@/lib/api-client";
import { SEND_OTP_ROUTE } from "@/util/constants";
import toast from "react-hot-toast";

function OTPDialog({
  isOTPDialogOpend,
  setIsOTPDialogOpend,
  purpose,
  email,
  password,
  setSecret,
  submitHandler,
}) {
  const [otp, setOtp] = useState("");
  const { seconds, isActive, resetTimer } = useCountdownTimer(60);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  const OTP_LENGTH = 6;

  const handleOTPChange = (value) => {
    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResendLoading(true);
      setIsLoading(true);
    
      const response = await apiClient.post(
        SEND_OTP_ROUTE,
        { purpose: purpose, email: email, ...(password && { password }) },
        { withCredentials: true }
      );

      if (response.status === 202) {
        setSecret(response.data.secret);
        resetTimer();
        toast.success("OTP sent successfully");
      } else {
        throw new Error("resend failed");
      }
      setIsLoading(false);
      setIsResendLoading(false);
    } catch (e) {
      setIsResendLoading(false);
      setIsLoading(false);
      toast.error("Unable to send otp try again");
    }
  };

  useEffect(() => {
    if (otp.length == OTP_LENGTH) {
      setIsSubmitButtonDisabled(false);
    } else {
      setIsSubmitButtonDisabled(true);
    }
  }, [otp]);

  return (
    <Dialog
      className="bg-white"
      open={isOTPDialogOpend}
      onOpenChange={isLoading ? () => {} : setIsOTPDialogOpend}
    >
      <DialogTitle />
      <DialogContent className="bg-[#181920] border-none text-white flex flex-col">
        <h2 className="text-3xl font-bold text-center text-white">Enter OTP</h2>
        <p className="text-center text-gray-400">
          We've sent a code to your email. Please enter it below.
        </p>
        <div className="flex justify-center">
          <InputOTP
            value={otp}
            onChange={handleOTPChange}
            maxLength={6}
            inputMode="numeric"
            pattern="[0-9]*"
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Time remaining:{" "}
            <span className="font-medium text-white">
              {formatTime(seconds)}
            </span>
          </span>
          {isResendLoading ? (
            <PulseLoader size={6} color="#7E22CE" />
          ) : (
            !isActive && (
              <button
                onClick={handleResendOTP}
                className="text-purple-700 hover:text-purple-900 focus:outline-none"
              >
                Resend OTP
              </button>
            )
          )}
        </div>
        {isActive && (
          <Button
            className="w-full bg-purple-700 hover:bg-purple-900 text-white"
            onClick={async () => {
              try {
                setIsLoading(true);
                setIsSubmitButtonDisabled(true);
                await submitHandler(otp);
                setIsSubmitButtonDisabled(false);
                setIsLoading(false);
              } catch {
                setIsLoading(false);
                setIsSubmitButtonDisabled(false);
              }
            }}
            disabled={isSubmitButtonDisabled}
          >
            {isLoading ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default OTPDialog;
