import { atom } from "recoil";


export const selectedChatTypeAtom = atom({
    key:"selectedChatTypeAtom",
    default : null,
});

export const selectedChatDataAtom = atom({
    key:"selectedChatDataAtom",
    default : null,
});

export const selectedChatMessagesAtom = atom({
    key:"selectedChatMessagesAtom",
    default : [],
});
