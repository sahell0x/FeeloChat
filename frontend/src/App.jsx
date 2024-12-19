import { lazy, Suspense,useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValueLoadable, useSetRecoilState } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));
import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
import userInfoAtom from "./stores/userInfoAtom";
import getUserInfo from "./util/getUserInfo";
function App() {
  const [userInfo,setUserInfo] = useRecoilState(userInfoAtom);
  const [isLoading,setIsLoading] = useState(true);



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

    return <div>Loading...</div>
  }

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
