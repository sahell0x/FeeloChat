import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import CustomToaster from './components/ui/CustomToaster'
import { SocketProvider } from './context/SocketContext'


createRoot(document.getElementById('root')).render(
  <RecoilRoot>
  <SocketProvider>

   <CustomToaster/>
    <App />
    </SocketProvider>

    </RecoilRoot>
   
)
