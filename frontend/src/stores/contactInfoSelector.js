import { selector } from "recoil";
import chatAtom from "./chatAtom";

const contactInfoSelector = selector({
    key:"contactInfoSelector",
    get:({get})=>{
       const chatState = get(chatAtom);
       return chatState.selectedChatData;
    }
});

export default contactInfoSelector;