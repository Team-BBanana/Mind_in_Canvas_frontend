import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Header from './components/recycleComponent/Header/Header.tsx'
import Footer from './components/recycleComponent/Footer/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Header/>
        <App />
  </StrictMode>,
)
