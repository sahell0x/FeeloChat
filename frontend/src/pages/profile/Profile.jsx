import { useRecoilState } from "recoil";
import userInfoAtom from "@/stores/userInfoAtom";
import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import updateProfile from "@/util/updateProfile";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

function Profile() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setProfileImage(userInfo.img);
    }
  }, [userInfo]);

  const handleBack = () => {
    if (userInfo.profileSetup) {
      navigate("/chat");
    } else {
      toast.error("Please setup profile first.");
    }
  };
  const handleSaveChanges = () => {
    setIsButtonDisabled(true);
    updateProfile(firstName, lastName)
      .then((data) => {
        if (data) {
          setUserInfo({ ...data });

          navigate("/chat");
        }
        setIsButtonDisabled(false);
      })
      .catch((e) => {
        setIsButtonDisabled(false);
      });
  };
  return (
    <div className="h-[100vh] flex bg-[#1b1c24] text-white/90 items-center justify-center flex-col gap-7">
      <ProfileAvatar
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <div className="flex items-center justify-center flex-col gap-5">
        <Input
          value={userInfo.email}
          disabled
          className="flex border-none bg-[#2c2e3b] items-center justify-center "
          type="email"
          style={{ fontSize: "17px" }}
        ></Input>
        <Input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
          className="flex border-none bg-[#2c2e3b] items-center justify-center "
          type="text"
          placeholder="First name"
          style={{ fontSize: "17px" }}
        ></Input>

        <Input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
          className="flex border-none bg-[#2c2e3b] items-center justify-center "
          type="text"
          placeholder="Last name"
          style={{ fontSize: "17px" }}
        ></Input>
        <div className="flex flex-row gap-5">
          <Button
            className="w-35 w-35 bg-[#2c2e3b] hover:bg-[#3a3b45] text-white hover:text-white"
            variant="outline"
            disabled={isButtonDisabled}
            onClick={handleBack}
          >
            back
          </Button>

          <Button
            disabled={isButtonDisabled}
            onClick={handleSaveChanges}
            className="w-40 bg-purple-700 hover:bg-purple-900"
          >
            {isButtonDisabled ? (
              <ClipLoader size={20} color="#ffffff" />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
