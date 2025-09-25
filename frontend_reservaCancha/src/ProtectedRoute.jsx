import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // 🚫 Si no hay token, redirige al login
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Si hay token, muestra el contenido
  return children;
}
