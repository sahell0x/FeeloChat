import { atom } from "recoil";

const shouldScrollAtom = atom({
    key:"shouldScrollAtom",
    default:true,
});

export default shouldScrollAtom;