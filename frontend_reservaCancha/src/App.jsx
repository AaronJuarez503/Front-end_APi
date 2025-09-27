import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLogin } from './Form';
import { FormRegister } from './FormR';
import { Dashboard } from './Dashboard';
import { FormCancha } from './CreateCancha';
import { ViewCanchas } from './VistaCancha';
import { FormEditCancha } from './FormEditCancha';
import { FormReserva } from './FormReserva';
import { ViewReservas } from "./ViewReservas";
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<FormLogin />} />
        <Route path="/auth/register" element={<FormRegister />} />
        <Route path="/cancha/create" element={<ProtectedRoute><FormCancha /></ProtectedRoute>} />
        <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/canchas" element={<ProtectedRoute><ViewCanchas /></ProtectedRoute>} />
         <Route path="/cancha/edit/:id" element={<ProtectedRoute><FormEditCancha /></ProtectedRoute>} />
         <Route path="/reserva/create" element={<ProtectedRoute><FormReserva /></ProtectedRoute>} />
         <Route path="/reservas" element={<ProtectedRoute><ViewReservas /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;