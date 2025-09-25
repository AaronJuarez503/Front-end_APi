import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="card shadow p-4" style={{ maxWidth: "420px", width: "100%", borderRadius: "1rem" }}>
    <div className="card-body">
    <div className="text-center mb-4">
    <h3 className="fw-bold">Mi App</h3>
    <p className="text-muted mb-0">Bienvenido — inicia sesión para continuar</p>
    </div>


    <form onSubmit={handleSubmit}>
    <div className="mb-3 form-floating">
    <input type="text" name="username" value={inputs.username} onChange={handleChange} className="form-control" id="username" placeholder="nombre@juanito123" required />
    <label htmlFor="username">Nombre de Usuario</label>
    </div>


    <div className="mb-3 form-floating">
    <input type="password" name="password" value={inputs.password} onChange={handleChange} className="form-control" id="password" placeholder="Contraseña" required />
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
            className="btn btn-primary" 
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
    );
}