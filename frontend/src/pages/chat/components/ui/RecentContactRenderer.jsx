import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { useCallback } from "react";


const RecentContactRenderer = ({ contact, isSelected, onClick }) => {
    const handleClick = useCallback(() => {
      onClick(contact);
    }, [onClick, contact]);
  
    return (
      <div
        onClick={handleClick}
        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
          isSelected ? "bg-[#3a3b45] text-white" : "hover:bg-[#2c2e3b]"
        }`}
        style={{ maxWidth: "100%", minWidth: "250px" }}
      >
        <div className="relative">
          <Avatar>
            <AvatarImage src={contact.img} />
            <AvatarFallback className="bg-[#3a3b45] text-white">{"A"}</AvatarFallback>
          </Avatar>
  
          {/* <Circle
            className={`absolute bottom-0 right-0 h-3 w-3 ${
              contact.status === "online"
                ? "fill-green-500 text-green-500"
                : "fill-gray-400 text-gray-400"
            }`}
          /> */} 
  
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate text-white">
            {contact?.firstName || contact?.lastName
              ? `${contact.firstName} ${contact.lastName}`
              : "User"}
          </h3>
          <p className="text-sm text-gray-400 truncate" style={{ maxWidth: "200px" }}>
            {contact.lastMessage}
          </p>
        </div>
      </div>
    );
  };  

  export default RecentContactRenderer;