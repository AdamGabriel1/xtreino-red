import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TorneioProvider } from './context/TorneioContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TorneioProvider>
      <App />
    </TorneioProvider>
  </StrictMode>,
)
