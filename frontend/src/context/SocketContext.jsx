import userInfoAtom from "@/stores/userInfoAtom";
import { HOST } from "@/util/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = ()=>{
    return useContext(SocketContext);
};

export const socketProvider = ({children})=>{
    const socket = useRef();
    const userInfo = useRecoilValue(userInfoAtom);

    useEffect(()=>{
        if(userInfo){
            socket.current = io(HOST,{
                withCredentials:true,
                query:{userId : userInfo.id}
            });

            socket.current.on("connect",()=>{
                console.log("connected to the socket server");
            });

            return ()=>{
                socket.current.disconnect();
            }
        }
    },[userInfo])

    return <SocketContext.Provider value={socket.current}>
        {children}
    </SocketContext.Provider>
}

