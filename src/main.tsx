import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// 重点：必须有下面这一行
import { LanguageProvider } from './context/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 重点：必须用这个包住 App */}
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)