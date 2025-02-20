import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClipLoader } from "react-spinners";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Debounce } from "@/util/debounce";
import GradientWrapper from "@/components/ui/GradientWrapper";
import apiClient from "@/lib/api-client";
import { SEARCH_ROUTE } from "@/util/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProfileWrapper from "./ProfileWrapper";
import { useSetRecoilState } from "recoil";
import { selectedChatDataAtom, selectedChatTypeAtom } from "@/stores/chatAtom";

function NewMessage() {
  const setSelectedChatType = useSetRecoilState(selectedChatTypeAtom);
  const setSelectedChatData = useSetRecoilState(selectedChatDataAtom);

  const [isContactDialogOpend, setIsContactDialogOpend] = useState(false);

  const [searchedContacts, setSearchedContacts] = useState([]);

  const [loading,SetLoading] = useState(false);
  
  const handleContactSearch = async (query) => {
    try {
      if (query.length != 0) {
        SetLoading(true);
        const queryResponse = await apiClient.get(
          `${SEARCH_ROUTE}?query=${query}`,
          { withCredentials: true }
        );

        const contacts = queryResponse.data.contacts;
        if (queryResponse.status === 200 && contacts.length) {
          setSearchedContacts([...contacts]);
        } else {
          setSearchedContacts([]);
        }
        SetLoading(false);
      }
    } catch {
      setSearchedContacts([]);
      SetLoading(false);
    }
  };
  const debouncer = new Debounce();
  const debouncedHandleContactSearch = debouncer.debounce(
    handleContactSearch,
    500
  );

  const selectNewContact = (contact) => {
    setIsContactDialogOpend(false);
    setSelectedChatType("contact");
    setSelectedChatData({...contact});
    setSearchedContacts([]);
  };

  return (
    <>
      <Button
        className="w-full bg-[#2c2e3b] text-white/90 hover:bg-[#3a3b45]  border-[#3a3b45] hover:text-white"
        variant="outline"
        onClick={() => setIsContactDialogOpend(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Message
      </Button>

      <Dialog
        open={isContactDialogOpend}
        onOpenChange={setIsContactDialogOpend}
      >
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">
              Select a contact
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] text-white/90"
              onChange={(e) =>
                debouncedHandleContactSearch(e.target.value.trim())
              }
            />
          </div>

          {searchedContacts.length == 0 ? (
            <div className="h-[100%] w-[100%] flex items-center justify-center flex-col">
              {loading ? <ClipLoader color="#9333ea" />  : (<h1 className="text-xl md:text-2xl text-white/80">
                Please{" "}
                <span className="font-bold">
                  <GradientWrapper>Search</GradientWrapper>
                </span>{" "}
                for a new contact
              </h1>)}
            </div>
          ) : (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => {
                  return (
                    <div
                      className="cursor-pointer"
                      onClick={() => selectNewContact(contact)}
                      key={contact._id}
                    >
                      <ProfileWrapper
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        email={contact.email}
                        img={contact.img}
                      />
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewMessage;
