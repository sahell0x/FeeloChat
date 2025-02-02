import apiClient from "@/lib/api-client";
import {profileNameValidator} from "./validator";
import {USER_ROUTE} from "./constants";
import toast from "react-hot-toast";

const updateProfile = async (firstName,lastName) =>{
    if(!firstName.length || !lastName.length){
       toast.error("First name and last name cannot be empty.");
    }else if(!profileNameValidator(firstName) ||!profileNameValidator(lastName) ){
        toast.error("Spcial characters are not allowed.");
    }else{
        try{
            console.log(firstName,lastName);
            const response = await apiClient.patch(USER_ROUTE,{firstName,lastName},{withCredentials:true});

            if(response.status === 202){
                toast.success("Saved successfully.");
                    console.log(response.data);
                    return response.data;
            }else{
                toast.error("Unable to save changes.");
                    return null;
            }

            
        }catch(e){
            toast.error("Unable to save changes try again.");
                return null;
        }
    }
    return null;
}

export default updateProfile;