import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './apps/App.jsx'
import './apps/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
