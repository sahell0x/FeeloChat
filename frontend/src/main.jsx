import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import CustomToaster from "./components/ui/CustomToaster";

console.log("main re rendered");
createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <CustomToaster />
    <App />
  </RecoilRoot>
);
