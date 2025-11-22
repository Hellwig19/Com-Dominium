import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/Login.tsx';
import Administracao from './pages/Home_Administracao.tsx';
import Manutencao from './pages/Manutencao.tsx';
import Portaria from './pages/Home_portaria.tsx';
import Encomendas from './pages/Encomendas.tsx';
import Reservas from './pages/Reservas.tsx';
import CadastrosPendentes from './pages/CadastrosPendentes.tsx';
import ProtectedRoute from './Components/ProtectedRoute.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredLevel={2}>
              <Administracao />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/cadastros-pendentes"
          element={
            <ProtectedRoute requiredLevel={2}>
              <CadastrosPendentes />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/portaria' 
          element={
            <ProtectedRoute requiredLevel={3}>
              <Portaria />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path='/manutencao' 
          element={
            <ProtectedRoute requiredLevel={5}>
              <Manutencao/>
            </ProtectedRoute>
          } 
        />
        <Route 
          path='/reservas'
          element={
            <ProtectedRoute requiredLevel={2}>
              <Reservas />
            </ProtectedRoute>
          }
        />
        
        <Route path='/encomendas' element={<Encomendas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);