const { selector } = require("recoil");
const { default: chatAtom } = require("./chatAtom");


const contactInfoSelector = selector({
    key:"contactInfoSelector",
    get:(get)=>{
       const chatState = get(chatAtom);
       return chatState.selectedChatData;
    }
});

export default contactInfoSelector;