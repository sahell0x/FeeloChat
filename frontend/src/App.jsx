import { lazy, Suspense } from "react"
import { BrowserRouter, Route ,Routes} from "react-router-dom"
const Auth = lazy(()=>import("./pages/auth/Auth"));
const Chat = lazy(()=>import("./pages/chat/Chat"));
const Profile = lazy(()=>import("./pages/profile/Profile"));
function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Suspense><Auth></Auth></Suspense>}></Route>
      <Route path="/chat" element={<Suspense><Chat></Chat></Suspense>}></Route>
      <Route path="/profile" element={<Suspense><Profile></Profile></Suspense>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
