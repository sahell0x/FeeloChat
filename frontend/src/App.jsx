import { lazy, Suspense,useEffect } from "react";
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
  // const setUserInfo = useSetRecoilState(userInfoAtom);

  // const getUserInfoState = useRecoilValueLoadable(getUserInfoSelector);
  
  // useEffect(() => {
  //   if (getUserInfoState.state === "hasValue") {
  //     setUserInfo({ ...getUserInfoState.contents });
  //   }
  // }, [getUserInfoState, setUserInfo]);

  // if (getUserInfoState.state === "loading") {
  //   return <div>Loading...</div>;
  // }

  // if (getUserInfoState.state === "hasError") {
  //   return <div>Error while fetching data</div>;
  // }



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
