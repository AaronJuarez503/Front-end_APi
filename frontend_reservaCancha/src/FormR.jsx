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

        console.log('Enviando datos de registro:', inputs);

        try {
            const response = await axios({
                method: 'post',
                url: 'https://reservas-cancha-1.onrender.com/auth/register', // Asegúrate de que este sea el endpoint correcto
                headers: {
                    'Content-Type': 'application/json'
                },
                data: inputs
            });

            console.log('Respuesta del servidor:', response.data);
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
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow p-4" style={{ maxWidth: "480px", width: "100%", borderRadius: "1rem" }}>
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
                        <select
                            name="rol"
                            value={inputs.rol}
                            onChange={handleChange}
                            className="form-select"
                            id="rol"
                            required
                        >
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
                            <button
                                className="btn btn-success"
                                type="submit"
                                disabled={isLoading}
                            >
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
    );
}
