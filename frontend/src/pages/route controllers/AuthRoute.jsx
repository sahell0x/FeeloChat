import userInfoAtom from "@/stores/userInfoAtom";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function AuthRoute({children}) {
  const userInfo = useRecoilValue(userInfoAtom );
  const isAuthenticated = userInfo; 

  return isAuthenticated ?  <Navigate to="/chat"></Navigate> : children ;
}

export default AuthRoute;
