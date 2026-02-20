import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CyveraPortfolio from './cyvera-portfolio'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CyveraPortfolio />
  </StrictMode>
)