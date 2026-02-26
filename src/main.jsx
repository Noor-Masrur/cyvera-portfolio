import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CyveraPortfolio from "./cyvera-portfolio";
import "./styles/global.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CyveraPortfolio />
    </BrowserRouter>
  </StrictMode>
)
