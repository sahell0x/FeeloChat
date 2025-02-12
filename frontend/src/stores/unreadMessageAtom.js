import { atom } from "recoil";

const unreadMessageAtom = atom({
    key:"unreadMessageAtom",
    default:{},
});

export default unreadMessageAtom;