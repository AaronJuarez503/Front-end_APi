import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLogin } from './Form';
import { FormRegister } from './FormR';
import { Dashboard } from './Dashboard';
import { ProtectedRoute } from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<FormLogin />} />
        <Route path="/auth/register" element={<FormRegister />} />
        <Route path="/dashboard"element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
      </Routes>
    </Router>
  );
}

export default App;