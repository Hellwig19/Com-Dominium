import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Login.tsx';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Zeladoria from './pages/Home_zeladoria.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/zeladoria" element={<Zeladoria />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);