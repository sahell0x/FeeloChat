import { atom } from "recoil";

const recentContactDataAtom = atom({
    key:"recentContactDataAtom",
    default:{},
});

export default recentContactDataAtom;