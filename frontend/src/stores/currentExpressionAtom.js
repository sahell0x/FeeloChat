import { atom } from "recoil";

const currentExpressionAtom = atom({
    key:"currentExpressionAtom",
    default:"",
});

export default currentExpressionAtom;