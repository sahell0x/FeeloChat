import apiClient from "@/lib/api-client";
import {profileNameValidator} from "./validator";
import {USER_ROUTE} from "./constants";

const updateProfile = async (toast,firstName,lastName) =>{
    if(!firstName.length || !lastName.length){
        toast({variant: "destructive",
            title: "First name and last name cannot be empty.",});
    }else if(!profileNameValidator(firstName) ||!profileNameValidator(lastName) ){
        toast({variant: "destructive",
            title: "Spcial characters are not allowed.",});
    }else{
        try{
            const response = await apiClient.patch(USER_ROUTE,{firstName,lastName},{withCredentials:true});

            console.log(response);
        }catch(e){
            toast({variant: "destructive",
                title: "Unable to save changes try again. ",});
        }
    }
}

export default updateProfile;