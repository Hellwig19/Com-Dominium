import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredLevel?: number;
}

export default function ProtectedRoute({ children, requiredLevel }: ProtectedRouteProps) {
  // CORREÇÃO: Busca os dados no sessionStorage OU localStorage
  const token = sessionStorage.getItem('admin_token') || localStorage.getItem('admin_token');
  const storedLevel = sessionStorage.getItem('admin_nivel') || localStorage.getItem('admin_nivel');
  
  const userLevel = parseInt(storedLevel || '0'); 

  // Se não tem token em nenhum lugar, manda pro login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se o nível não for suficiente, manda pro login
  if (requiredLevel && userLevel < requiredLevel) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}