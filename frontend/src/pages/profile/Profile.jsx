import { useRecoilState, useRecoilValue } from "recoil"
import userInfoAtom from "@/stores/userInfoAtom"
import { useState } from "react";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import Modal from "@/components/ui/Modal";

function Profile() {
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [email,setEmail] = useState("");
  const [profileImage,setProfileImage] = useState("");


  return (
    <div className="h-[100vh] flex items-center justify-center flex-col gap-5">

      <Modal>
      <ProfileAvatar profileImage={profileImage}/>
      </Modal>
      
    </div>
  )
}

export default Profile
