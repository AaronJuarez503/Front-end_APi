import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export function FormLogin(){
     const [inputs, setInputs] = useState({
         username: '',
         password: ''
     });
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);
     const [successMessage, setSuccessMessage] = useState(null);
     const navigate = useNavigate();

     const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log(inputs)
     }

     const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);
        
        console.log('Enviando datos:', {
           username: inputs.username,
           password: inputs.password
        });

        try {
  const response = await axios({
    method: 'post',
    url: 'https://reservas-cancha-1.onrender.com/auth/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      username: inputs.username,
      password: inputs.password
    }
  });

  console.log('Respuesta del servidor:', response.data);
  localStorage.setItem('token', response.data.access_token);

  // Decodificamos token para extraer el rol
  const decodedToken = jwtDecode(response.data.access_token);
  const rolUsuario = decodedToken.role || decodedToken.rol || "CLIENTE";

  // Guardamos rol en localStorage
  localStorage.setItem("rol", rolUsuario);

  setSuccessMessage('¡Inicio de sesión exitoso!');
  setInputs({
    username: '',
    password: ''
  });
  navigate('/dashboard');

        } catch (error) {
            console.error('Error completo:', error);
            setError(
                error.response?.data?.message || 
                error.message || 
                'Error al conectar con el servidor'
            );
        } finally {
            setIsLoading(false);
        }
     }

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
        }
        .form-card {
          width: 100%;
          max-width: 420px;
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
              <h3 className="fw-bold">Mi App</h3>
              <p className="text-muted mb-0">Bienvenido — inicia sesión para continuar</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="username"
                  value={inputs.username}
                  onChange={handleChange}
                  className="form-control"
                  id="username"
                  placeholder="nombre@juanito123"
                  required
                />
                <label htmlFor="username">Nombre de Usuario</label>
              </div>

              <div className="mb-3 form-floating">
                <input
                  type="password"
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="Contraseña"
                  required
                />
                <label htmlFor="password">Contraseña</label>
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
                <button
                  className="btn btn-primary btn-fullwidth"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </div>

              <p className="text-center small mb-0">
                ¿No tienes cuenta? <Link to="/auth/register">Regístrate</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
    );
}
