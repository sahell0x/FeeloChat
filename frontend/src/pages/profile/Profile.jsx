import { useRecoilState, useRecoilValue } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import Modal from "@/components/ui/Modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import updateProfile from "@/util/updateProfile";
import { useNavigate } from "react-router-dom";


function Profile() {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setProfileImage(userInfo.img);
      console.log(userInfo.img);
    }
  }, [userInfo]);

  const handleBack = ()=>{
    if(userInfo.profileSetup){
      navigate("/chat");
    }else{
      toast({variant: "destructive",
        title: "Please setup profile first.",});
    }
  }
  const handleSaveChanges = () => {
    updateProfile(toast, firstName, lastName)
      .then((data) => {
        if (data) {
          console.log(data);
          setUserInfo({ ...data });
          navigate("/chat");
          console.log(userInfo);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log("rendered from profole");
  return (
    <Modal>
                
      <div className="h-[100vh] flex items-center justify-center flex-col gap-7">
        <ProfileAvatar profileImage={profileImage} setProfileImage={setProfileImage}/>
        <div className="flex items-center justify-center flex-col gap-5">
          <Input
            value={userInfo.email}
            disabled
            className="flex items-center justify-center text-center"
            type="email"
            style={{ fontSize: "17px" }}
          ></Input>
          <Input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            className="flex items-center justify-center text-center"
            type="text"
            placeholder="First name"
            style={{ fontSize: "17px" }}
          ></Input>

          <Input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            className="flex items-center justify-center text-center"
            type="text"
            placeholder="Last name"
            style={{ fontSize: "17px" }}
          ></Input>
          <div className="flex flex-row gap-5">
          <Button className="w-35"
          variant="outline"
          onClick={handleBack}
          >back</Button>

          <Button 

          onClick={handleSaveChanges} className="w-40">
            Save changes
          </Button>

          
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Profile;

