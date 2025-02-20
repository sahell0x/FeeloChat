import { useEffect, useState, useMemo } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { SiLivechat } from "react-icons/si";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import UserProfileInfo from "./ui/UserProfileInfo";
import NewMessage from "./ui/NewMessage";
import recentContactAtom from "@/stores/recentContactAtom";
import apiClient from "@/lib/api-client";
import { CONTACT_ROUTE } from "@/util/constants";
import {
  selectedChatDataAtom,
  selectedChatMessagesAtom,
  selectedChatTypeAtom,
} from "@/stores/chatAtom";
import toast from "react-hot-toast";
import FeeloChat from "@/components/logo/FeeloChat";
import RecentContactRenderer from "./ui/RecentContactRenderer";
import { ClipLoader } from "react-spinners";
import messagePageAtom from "@/stores/messagePageAtom";
import unreadMessageCountAtom from "@/stores/unreadMessageCountAtom";
import recentContactDataAtom from "@/stores/recentContactDataAtom";
import messageSeenTrackerAtom from "@/stores/messsageSeenTrackerAtom";

function ContactContainer() {
  const [selectedChatData, setSelectedChatData] =
    useRecoilState(selectedChatDataAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentContact, setRecentContact] = useRecoilState(recentContactAtom);
  const [recentContactData, setRecentContactData] = useRecoilState(
    recentContactDataAtom
  );
  const setSelectedChatType = useSetRecoilState(selectedChatTypeAtom);
  const selectedChatMessageReset = useResetRecoilState(
    selectedChatMessagesAtom
  );
  const setMessageSeenTracker = useSetRecoilState(messageSeenTrackerAtom);
  const setUnReadMessageCounts = useSetRecoilState(unreadMessageCountAtom);
  const resetMessagePage = useResetRecoilState(messagePageAtom);

  const [isLoading, setIsLoading] = useState(false);

  const filteredContacts = useMemo(() => {
    return recentContact.filter(
      (contact) =>
        recentContactData[contact]?.firstName
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase()) ||
        recentContactData[contact]?.lastName
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase())
    );
  }, [recentContact, searchQuery]);

  const handleContactClick = (contact) => {
    if (selectedChatData?._id !== contact?.id) {
      selectedChatMessageReset();
      resetMessagePage();
      setSelectedChatType("contact");

      setSelectedChatData({
        _id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        img: contact.img,
        publicKey: contact.publicKey,
      });
    }
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(CONTACT_ROUTE, {
          withCredentials: true,
        });

        setIsLoading(false);
        if (response.status === 200) {
          const responseData = response.data?.recentContacts;

          const recentContactsList = responseData.reduce((acc, current) => {
            acc.push(current?.id);
            return acc;
          }, []);

          const recentContactsDataList = responseData.reduce((acc, current) => {
            acc[current?.id] = {
              ...current,
            };
            return acc;
          }, {});

          const messageSeenList = responseData.reduce((acc, current) => {

            acc[current?.id] = current.isSent ? current.lastMessageIsRead : false;

            return acc;
          }, {});


          setMessageSeenTracker(messageSeenList);
          setRecentContactData(recentContactsDataList);
          setRecentContact(recentContactsList);

          const unreadMessageCounts = responseData.reduce((acc, current) => {
            acc[current?.id] = current?.unreadCount;
            return acc;
          }, {});

          setUnReadMessageCounts(unreadMessageCounts);
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
                key={contact}
                contact={recentContactData[contact]}
                isSelected={selectedChatData?._id === contact}
                onClick={handleContactClick}
              />
            ))
          ) : (
            <div className=" absolute flex items-center justify-center top-20 w-full text-gray-300 text-xl">
              {isLoading ? (
                <ClipLoader color="#9333ea" />
              ) : (
                " No recent coontact"
              )}
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
