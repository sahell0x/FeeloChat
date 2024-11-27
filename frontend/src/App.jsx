import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot, useRecoilValueLoadable, useSetRecoilState } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));
import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
import userInfoAtom from "./stores/userInfoAtom";
import getUserInfoSelector from "./stores/getUserInforSelector.js";

function App() {
  const setUserInfo = useSetRecoilState(userInfoAtom);

  const getUserInfoState = useRecoilValueLoadable(getUserInfoSelector);
  
  if(getUserInfoSelector.state=="loading"){
    return <div>loading...</div>
  }else if(getUserInfoSelector.state=="hasError")
  {
    return <div>error while fetching data</div>
  }

  if(getUserInfoSelector.contents){
    setUserInfo({...getUserInfoSelector.contents});
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
