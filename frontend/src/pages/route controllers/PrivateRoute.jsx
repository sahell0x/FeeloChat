import userInfoAtom from "@/stores/userInfoAtom";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function PrivateRoute({children}) {
  const userInfo = useRecoilValue(userInfoAtom );
  const isAuthenticated = userInfo; 

  return isAuthenticated ? children : <Navigate to="/"></Navigate>;
}

export default PrivateRoute
