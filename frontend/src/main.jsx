import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from "@/components/ui/toaster"
import './index.css'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RecoilRoot>
    <App />
    <Toaster />
    </RecoilRoot>
  </StrictMode>,
)
