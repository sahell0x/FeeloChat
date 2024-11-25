import { useRecoilValue } from "recoil"
import userInfoAtom from "@/stores/userInfoAtom"

function Profile() {
  const userInfo = useRecoilValue(userInfoAtom);
  return (
    <div>
      {userInfo.email}
    </div>
  )
}

export default Profile
