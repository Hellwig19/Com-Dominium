import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/Login.tsx';
import Adminstracao from './pages/Home_Administracao.tsx';
import Manutencao from './pages/Manutencao.tsx'
import Portaria from './pages/Home_portaria.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adminstracao" element={<Adminstracao />} />
        <Route path='/portaria' element={<Portaria />} />
        <Route path='/manutencao' element={<Manutencao />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);