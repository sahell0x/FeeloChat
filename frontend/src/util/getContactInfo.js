import apiClient from "@/lib/api-client";
import { CONTACT_INFO_ROUTE } from "./constants";
const getContactInfo = async(id)=>{
    try{
        const response = await apiClient.get(`${CONTACT_INFO_ROUTE}?id=${id}`,{withCredentials:true});
        if(response.status === 200){
            return response.data;
        }else{
            throw new Error("somthing wents wrong");
        }

    }catch{
        return null;
    }
}


export default getContactInfo;