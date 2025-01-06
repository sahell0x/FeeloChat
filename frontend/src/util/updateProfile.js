

const updateProfile = (toast,firstName,lastName) =>{
    if(!firstName.length || !lastName.length){
        toast({variant: "destructive",
            title: "First name and last name cannot be empty.",});
    }
}

export default updateProfile;