import FeeloChat from "@/components/logo/FeeloChat";
import { SiLivechat } from "react-icons/si";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Circle } from "lucide-react";

const initialContacts = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100",
    status: "online",
    lastMessage: "Same here! Working on that new feature we discussed. It’s taking longer than expected!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
  {
    id: 2,
    name: "Alice Smith",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100",
    status: "offline",
    lastMessage: "Thanks for the update!",
  },
];

function ContactContainer() {
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#f9fafb] border-r border-gray-200 h-full">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 border-b">
        <FeeloChat />
        <SiLivechat className="w-8 h-8 text-purple-500 transform hover:scale-105 transition-transform" />
      </div>

      {/* Search Input */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Contacts */}
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-2">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                selectedContact.id === contact.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-gray-100"
              }`}
              style={{ maxWidth: "100%", minWidth: "250px" }} // Ensure consistent div size
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>
                    {contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Circle
                  className={`absolute bottom-0 right-0 h-3 w-3 ${
                    contact.status === "online"
                      ? "fill-green-500 text-green-500"
                      : "fill-gray-400 text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{contact.name}</h3>
                <p className="text-sm text-gray-500 truncate" style={{ maxWidth: "150px" }}>
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* New Message Button */}
      <div className="p-4 border-t">
        <Button className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>
    </div>
  );
}

export default ContactContainer;
