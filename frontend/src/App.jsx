import { lazy, Suspense,useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {  useRecoilState } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));
import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
import userInfoAtom from "./stores/userInfoAtom";
import getUserInfo from "./util/getUserInfo";
import Loader from "./components/ui/Loader";
import { getPrivateKey } from "./db/indexedDB";
import test from "./encryption/test";
function App() {
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [isLoading,setIsLoading] = useState(true);
  
  // test();

  useEffect(()=>{

    if(!userInfo){
      getUserInfo().then((data)=>{
        
        setUserInfo(data);
        setIsLoading(false);

      }).catch((e)=>{
        console.log(e);
         setIsLoading(false);
      });
    }else{
      setIsLoading(false);
    }
  },[userInfo,setUserInfo]);
  console.log("rerender");

  if(isLoading){

    return <Loader/>
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="*"
            element={
              <AuthRoute>
              <Suspense fallback={<Loader/>}>
                <Auth></Auth>
              </Suspense>
              </AuthRoute>
            }
          ></Route>
          
          <Route
            path="/chat"
            element={
              <PrivateRoute>
              <Suspense fallback={<Loader/>}>
                <Chat></Chat>
              </Suspense>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Suspense fallback={<Loader/>}>
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
