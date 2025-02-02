import apiClient from "@/lib/api-client";
import { USER_ROUTE } from "@/util/constants";

const getUserInfo = async()=>{

    console.log("request is going out");
   
        try{

            console.log(USER_ROUTE);
            
            const response = await apiClient.get(USER_ROUTE,{withCredentials:true});
            if(response.status===200) return response.data;
            return null;


        }catch(e){
            console.log(e);
            throw new Error();
        }
    }

export default getUserInfo;