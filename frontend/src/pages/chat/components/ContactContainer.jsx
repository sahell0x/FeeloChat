import { useEffect, useState, useMemo, useCallback } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { SiLivechat } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import UserProfileInfo from "./ui/UserProfileInfo";
import NewMessage from "./ui/NewMessage";
import recentContactAtom from "@/stores/recentContactAtom";
import apiClient from "@/lib/api-client";
import { CONTACT_ROUTE } from "@/util/constants";
import { selectedChatDataAtom, selectedChatTypeAtom } from "@/stores/chatAtom";
import toast from "react-hot-toast";
import FeeloChat from "@/components/logo/FeeloChat";
import RecentContactRenderer from "./ui/RecentContactRenderer";
import { ClipLoader } from "react-spinners";


function ContactContainer() {
  const [selectedChatData, setSelectedChatData] =
    useRecoilState(selectedChatDataAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentContact, setRecentContact] = useRecoilState(recentContactAtom);
  const setSelectedChatType = useSetRecoilState(selectedChatTypeAtom);
  const [isLoading,setIsLoading] = useState(false);

  const filteredContacts = useMemo(() => {
    return recentContact.filter((contact) =>
      contact?.firstName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
  }, [recentContact, searchQuery]);

  const handleContactClick = useCallback(
    (contact) => {
      setSelectedChatData({
        _id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        img: contact.img,
      });
      setSelectedChatType("contact");
    },
    [setSelectedChatData, setSelectedChatType]
  );

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(CONTACT_ROUTE, {
          withCredentials: true,
        });

        console.log(response);
        setIsLoading(false);
        if (response.status === 200) {
          // setRecentContact(response.data.Recentcontacts);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Unable to fetch Contacts.");
      }
    };
    getContacts();
  }, [setRecentContact]);

  return (
    <div className="flex flex-col w-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r border-[#3a3b45] h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b border-[#3a3b45]">
        <FeeloChat />
        <SiLivechat className="w-8 h-8 text-purple-500 transform hover:scale-105 transition-transform" />
      </div>

      {/* Search Input */}
      <div className="p-4 border-b border-[#3a3b45]">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search"
            className="pl-9 bg-[#2c2e3b] border-[#3a3b45] text-white placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Contacts */}
      <ScrollArea className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-2">

          
          {filteredContacts.length ? (
            filteredContacts.map((contact) => (
              <RecentContactRenderer
                key={contact.id}
                contact={contact}
                isSelected={selectedChatData?._id === contact?.id}
                onClick={handleContactClick}
              />
            ))
          ) : (
            <div className=" absolute flex items-center justify-center top-20 w-full text-gray-300 text-xl">
                 {isLoading ? <ClipLoader color="#9333ea" /> :" No recent coontact"} 
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-[#3a3b45] flex items-center justify-center flex-col gap-3">
        <NewMessage />
        <UserProfileInfo />
      </div>
    </div>
  );
}

export default ContactContainer;
