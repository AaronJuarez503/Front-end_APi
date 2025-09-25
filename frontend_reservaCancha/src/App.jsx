import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLogin } from './Form';
import { FormRegister } from './FormR';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<FormLogin />} />
        <Route path="/auth/register" element={<FormRegister />} />
      </Routes>
    </Router>
  );
}

export default App;