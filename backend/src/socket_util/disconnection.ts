const disconnection = (socket:any , userMap: Map<K,V>)=>{
     console.log(`client disconnected ${socket.id}`);

     for(const [userId,socketId] of userMap.entries()){
        if(socketId === socket.id){
            userMap.delete(userId);
            break;
        }
     }
}

export default disconnection;