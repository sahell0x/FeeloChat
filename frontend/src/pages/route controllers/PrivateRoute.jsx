import userInfoAtom from "@/stores/userInfoAtom";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function PrivateRoute({children}) {
  const userInfo = useRecoilValue(userInfoAtom );
  const isAuthenticated = Object.keys(userInfo).length //check is there user info or not

  return isAuthenticated ? children : <Navigate to="/auth"></Navigate>;
}

export default PrivateRoute
