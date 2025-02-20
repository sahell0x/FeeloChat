import { atom } from "recoil";

const unreadMessageCountAtom = atom({
    key:"unreadMessageCountAtom",
    default:{},
});

export default unreadMessageCountAtom;