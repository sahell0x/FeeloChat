const { atom } = require("recoil");

const userInfoAtom = atom({
    key:"userInfoAtom",
    default:{},
})

export default userInfoAtom;