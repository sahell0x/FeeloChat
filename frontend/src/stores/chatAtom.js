import { atom } from "recoil";

const chatAtom = atom({
    key:"chatAtom",
    default:{
        selectedChatType : null,
        selectedChatData : null,
        selectedChatMessages : [],

    },
});

export default chatAtom;