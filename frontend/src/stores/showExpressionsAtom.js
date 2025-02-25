import { atom } from "recoil";

const showExpressionsAtom = atom({
    key:"showExpressionsAtom",
    default:false,
});

export default showExpressionsAtom;