import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Debounce } from "@/util/debounce";
import GradientWrapper from "@/components/ui/GradientWrapper";
import LogoSVG from "@/components/logo/LogoSVG";

function NewMessage() {
    const [isContactDialogOpende, setIsContactDialogOpende] = useState(false);
    const [searchedContacts,setSearchedContacts] = useState([]);
    
    const handleContactSearch = (query)=>{
      console.log(query);
    }
    const debouncer = new Debounce;
    const debouncedHandleContactSearch =  debouncer.debounce(handleContactSearch,500);

  return (
    <>
      <Button
        className="w-full bg-[#2c2e3b] text-white/90 hover:bg-[#3a3b45]  border-[#3a3b45] hover:text-white"
        variant="outline"
        onClick={()=>setIsContactDialogOpende(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        New Message
      </Button>

      <Dialog open={isContactDialogOpende} onOpenChange={setIsContactDialogOpende}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center">Select a contact</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input 
            placeholder="Search Contacts"
            className="rounded-lg p-6 bg-[#2c2e3b] text-white/90"
            onChange={(e)=>debouncedHandleContactSearch(e.target.value)}

             />
          </div>
          {searchedContacts.length ==0 && (
             <div className="h-[100%] w-[100%] flex items-center justify-center flex-col">
              <h1 className="text-xl md:text-2xl text-white/80">Please <span className="font-bold"><GradientWrapper>Search</GradientWrapper></span> for a  new contact</h1>
             </div>

          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewMessage;
