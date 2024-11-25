import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
const Auth = lazy(() => import("./pages/auth/Auth"));
const Chat = lazy(() => import("./pages/chat/Chat"));
const Profile = lazy(() => import("./pages/profile/Profile"));
import PrivateRoute from "./pages/route controllers/PrivateRoute";
import AuthRoute from "./pages/route controllers/AuthRoute";
function App() {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  );
}

export default App;
