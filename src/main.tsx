import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './pages/Login.tsx'; // Seu componente de Login
import Administracao from './pages/Home_Administracao.tsx';
import Manutencao from './pages/Manutencao.tsx';
import Portaria from './pages/Home_portaria.tsx';
import Encomendas from './pages/Encomendas.tsx';
import ProtectedRoute from './Components/ProtectedRoute.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Rota Pública (Login) */}
        <Route path="/" element={<App />} />

        {/* CORREÇÃO AQUI: Mudei requiredLevel de 5 para 2.
           Assim, tanto Nível 5 (Síndico) quanto Nível 2 (Admin) podem entrar.
        */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredLevel={2}>
              <Administracao />
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
        
        <Route path='/encomendas' element={<Encomendas />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);