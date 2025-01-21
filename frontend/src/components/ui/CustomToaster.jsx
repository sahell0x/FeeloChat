import  { Toaster } from "react-hot-toast";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

function CustomToaster() {
  return (
   
<Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: "#2c2e3b", 
      color: "#ffffff", 
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
      padding: "12px 16px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    success: {
      icon: <FaCheckCircle className="text-green-500" />, 
      style: {
        borderLeft: "4px solid #10b981", 
      },
    },
    error: {
      icon: <FaTimesCircle className="text-red-500" />,
      style: {
        borderLeft: "4px solid #ef4444", 
      },
    },
    loading: {
      icon: <FaSpinner className="text-blue-500 animate-spin" />, 
      style: {
        borderLeft: "4px solid #3b82f6",
      },
    },
  }}
/>

  )
}

export default CustomToaster
