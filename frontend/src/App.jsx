import { lazy, Suspense,useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));
import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
import userInfoAtom from "./stores/userInfoAtom";
import getUserInfoSelector from "./util/getUserIn.js";

function App() {
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [isLoading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false);


  useEffect(()=>{
    if(!userInfo){

      const fetchedUserInfo = useRecoilValueLoadable(getUserInfoSelector);
      console.log(fetchedUserInfo);
      
    }else{
      setIsLoading(false);
    }
  },[])
  

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <AuthRoute>
              <Suspense>
                <Auth></Auth>
              </Suspense>
              </AuthRoute>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <PrivateRoute>
              <Suspense>
                <Chat></Chat>
              </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Suspense>
                  <Profile></Profile>
                </Suspense>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
