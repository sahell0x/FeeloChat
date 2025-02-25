import { atom } from "recoil";

const isMobileAtom = atom({
    key:"isMobileAtom",
    default:false,
});

export default isMobileAtom;