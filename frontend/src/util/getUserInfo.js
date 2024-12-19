import apiClient from "@/lib/api-client";
import { USERINFO_ROUTE } from "@/util/constants";

const getUserInfo = async()=>{

    console.log("request is going out");
   
        try{
            
            const response = await apiClient.get(USERINFO_ROUTE,{withCredentials:true});
            if(response.status===200) return response.data;
            return null;


        }catch(e){

            throw new Error();
            return null;
        }
    }

export default getUserInfo;