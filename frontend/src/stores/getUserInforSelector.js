import { selector, useRecoilValue } from "recoil";
import userInfoAtom from "./userInfoAtom";
import apiClient from "@/lib/api-client";
import { USERINFO_ROUTE } from "@/util/constants";

const getUserInfoSelector = selector({
    key:"getUserInfoSelector",
    get: async ({get})=>{
        const userInfo = get(userInfoAtom);
        if(userInfo) return userInfo;

        try{
            
            const response = await apiClient.get(USERINFO_ROUTE,{withCredentials:true});
            if(response.status===200) return response.data;
            return null;


        }catch{
            return null;
        }
    }
});

export default getUserInfoSelector;