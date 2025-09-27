import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

export function FormRegister() {
  const [inputs, setInputs] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    username: '',
    email: '',
    password: '',
    rol: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try{
      const response = await axios({
        method: 'post',
        url: 'https://reservas-cancha-1.onrender.com/auth/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: inputs
      });

      setSuccessMessage('¡Registro exitoso!');
      setInputs({
        nombre: '',
        apellido: '',
        telefono: '',
        username: '',
        email: '',
        password: '',
        rol: 0
      });
    } catch(error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Error al conectar con el servidor'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #f8f9fa;
        }
        .full-screen-form-container {
  min-height: 100vh;
  height: auto;
  padding: 2rem 1rem 1rem 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  background-color: #f8f9fa;
}

        .form-card {
          width: 100%;
          max-width: 480px;
          border-radius: 1rem;
          padding: 2rem 2.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          background-color: white;
        }
        .form-card h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
        }
        .btn-fullwidth {
          width: 100%;
        }
        .alert {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .text-muted {
          margin-bottom: 1.5rem;
          text-align: center;
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="card form-card shadow">
          <div className="card-body">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Registro</h3>
              <p className="text-muted mb-0">Crea tu cuenta para comenzar</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-floating">
                <input type="text" name="nombre" value={inputs.nombre} onChange={handleChange} className="form-control" id="nombre" placeholder="Nombre" required />
                <label htmlFor="nombre">Nombre</label>
              </div>

              <div className="mb-3 form-floating">
                <input type="text" name="apellido" value={inputs.apellido} onChange={handleChange} className="form-control" id="apellido" placeholder="Apellido" required />
                <label htmlFor="apellido">Apellido</label>
              </div>

              <div className="mb-3 form-floating">
                <input type="text" name="telefono" value={inputs.telefono} onChange={handleChange} className="form-control" id="telefono" placeholder="Teléfono" required />
                <label htmlFor="telefono">Teléfono</label>
              </div>

              <div className="mb-3 form-floating">
                <input type="text" name="username" value={inputs.username} onChange={handleChange} className="form-control" id="username" placeholder="Usuario" required />
                <label htmlFor="username">Usuario</label>
              </div>

              <div className="mb-3 form-floating">
                <input type="email" name="email" value={inputs.email} onChange={handleChange} className="form-control" id="email" placeholder="Correo electrónico" required />
                <label htmlFor="email">Correo electrónico</label>
              </div>

              <div className="mb-3 form-floating">
                <input type="password" name="password" value={inputs.password} onChange={handleChange} className="form-control" id="password" placeholder="Contraseña" required />
                <label htmlFor="password">Contraseña</label>
              </div>

              <div className="mb-3 form-floating">
                <select name="rol" value={inputs.rol} onChange={handleChange} className="form-select" id="rol" required >
                  <option value="" disabled>Selecciona un rol</option>
                  <option value={1}>ADMIN</option>
                  <option value={2}>USER</option>
                </select>
                <label htmlFor="rol">Rol</label>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              <div className="d-grid mb-3">
                <button className="btn btn-success btn-fullwidth" type="submit" disabled={isLoading}>
                  {isLoading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>

              <p className="text-center small mb-0">
                ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
