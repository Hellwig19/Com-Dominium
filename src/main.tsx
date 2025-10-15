import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Login.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Zeladoria from './pages/Home_Administracao.tsx';
import HomePortaria from './pages/Home_Portaria.tsx';
import Manutencao from './pages/Manutencao.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Zeladoria" element={<Zeladoria />} />
        <Route path='/Homeportaria' element={<HomePortaria />}/>
        <Route path='/Manutencao' element={<Manutencao />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);