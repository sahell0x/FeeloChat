import { atom } from "recoil";

const recentContactAtom = atom({
    key:"recentContactAtom",
    default:[],
});

export default recentContactAtom;