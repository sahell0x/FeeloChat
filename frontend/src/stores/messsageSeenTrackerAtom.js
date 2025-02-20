import { atom } from "recoil";


const messageSeenTrackerAtom = atom({
    key:"messageSeenTrackerAtom",
    default : {},
});

export default messageSeenTrackerAtom;