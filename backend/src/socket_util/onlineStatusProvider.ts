//this funtion mainly handles the online status of contacts.


import getContacts from "./getContacts"


const onlineStatusProvider = async(userId:string ,io:any,userMap:Map<string,string>,isOnline:boolean)=>{

    const contacts :string[] = await getContacts(userId) as string[] ;

    const currentUserSocketId = userMap.get(userId);
     

    //if the function is called from the connection the user also need the status of its contacts this block handles that

    if(isOnline){
        io.to(currentUserSocketId).emit("status-update", contacts.reduce((acc:any, userId) => {
            acc[userId] = userMap.has(userId); 
            return acc;
        }, {}));
    }

    //this block handles update the online status to contacts if they are online

    for(let i =0 ; i<contacts.length ; i++){
        const userSocketId = userMap.get(contacts[i]);

        if(userSocketId){
            const userStatusObject:any = {};

            userStatusObject[contacts[i]] = isOnline;

            io.to(userSocketId).emit("status-update",userStatusObject);
        }
    }
    

}

export default onlineStatusProvider;