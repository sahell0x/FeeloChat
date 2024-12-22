import { useRecoilState, useRecoilValue } from "recoil"
import userInfoAtom from "@/stores/userInfoAtom"
import { useState } from "react";

function Profile() {
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  

  return (
    <div>
      
    </div>
  )
}

export default Profile
