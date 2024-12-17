import apiClient from "@/lib/api-client";
import { USERINFO_ROUTE } from "@/util/constants";

const getUserInfo = async()=>{
   
        try{
            
            const response = await apiClient.get(USERINFO_ROUTE,{withCredentials:true});
            if(response.status===200) return response.data;
            return null;


        }catch{
            throw new Error();
        }
    }

export default getUserInfo;