import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));

import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
import userInfoAtom from "./stores/userInfoAtom";
import getUserInfo from "./util/getUserInfo";
import Loader from "./components/ui/Loader";
import useSocketSetup from "./hooks/useSocketSetup";
import useIsMobile from "./hooks/useIsMobile";
function App() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [isLoading, setIsLoading] = useState(true);

  useSocketSetup();
  useIsMobile();

  useEffect(() => {
    console.log(
      "%cFeeloChat is open-source! 🚀\nIf you find a bug or want to contribute, please visit: %chttps://github.com/sahell0x/FeeloChat",
      "color: #ffffff; font-size: 16px; font-weight: bold;",
      "color: #2196F3; font-size: 14px; text-decoration: underline;"
    );
  }, []);

  useEffect(() => {
    if (!userInfo) {
      getUserInfo()
        .then((data) => {
          setUserInfo(data);
          setIsLoading(false);
        })
        .catch((e) => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <AuthRoute>
              <Suspense fallback={<Loader />}>
                <Auth></Auth>
              </Suspense>
            </AuthRoute>
          }
        ></Route>

        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Chat></Chat>
              </Suspense>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
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
