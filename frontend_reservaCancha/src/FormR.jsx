"use client"

import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export function FormRegister() {
  const [inputs, setInputs] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    username: "",
    email: "",
    password: "",
    rol: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await axios({
        method: "post",
        url: "https://reservas-cancha-1.onrender.com/auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        data: inputs,
      })

      setSuccessMessage("¡Registro exitoso!")
      setInputs({
        nombre: "",
        apellido: "",
        telefono: "",
        username: "",
        email: "",
        password: "",
        rol: 0,
      })
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Error al conectar con el servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        .full-screen-form-container {
          min-height: 100vh;
          height: auto;
          padding: 2rem 1rem;
          box-sizing: border-box;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%);
          position: relative;
        }

        .full-screen-form-container::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
          pointer-events: none;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .form-card {
          width: 100%;
          max-width: 500px;
          border-radius: 1.5rem;
          padding: 2.5rem;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.1);
          position: relative;
          z-index: 1;
        }

        .form-card h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #10b981;
          font-size: 2rem;
          letter-spacing: -0.02em;
        }

        .text-muted {
          margin-bottom: 2rem;
          text-align: center;
          color: #94a3b8;
          font-size: 0.95rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
          width: 100%;
          min-width: 0;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 500;
          font-size: 0.9rem;
          width: fit-content;
        }

        .input-label svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .form-control, .form-select {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          padding: 0.875rem 1rem !important;
          background: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(16, 185, 129, 0.3) !important;
          border-radius: 0.75rem !important;
          color: #e2e8f0 !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
        }

        .form-control:focus, .form-select:focus {
          background: rgba(30, 41, 59, 0.8) !important;
          border-color: #10b981 !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }

        .form-control::placeholder {
          color: #64748b !important;
        }

        .form-select option {
          background: #1e293b;
          color: #e2e8f0;
        }

        .btn-fullwidth {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          border-radius: 0.75rem;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .btn-fullwidth:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .btn-fullwidth:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .alert {
          margin-top: 0;
          margin-bottom: 1.25rem;
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          border: none;
        }

        .alert-danger {
          background: rgba(239, 68, 68, 0.15);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .login-link a {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .login-link a:hover {
          color: #6ee7b7;
          text-decoration: underline;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="form-card">
          <div className="text-center mb-4">
            <h3>Registro</h3>
            <p className="text-muted mb-0">Crea tu cuenta para comenzar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="nombre" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={inputs.nombre}
                onChange={handleChange}
                className="form-control"
                id="nombre"
                placeholder="Ingresa tu nombre"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="apellido" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Apellido
              </label>
              <input
                type="text"
                name="apellido"
                value={inputs.apellido}
                onChange={handleChange}
                className="form-control"
                id="apellido"
                placeholder="Ingresa tu apellido"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="telefono" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={inputs.telefono}
                onChange={handleChange}
                className="form-control"
                id="telefono"
                placeholder="Ingresa tu teléfono"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="username" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <polyline points="17 11 19 13 23 9" />
                </svg>
                Usuario
              </label>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleChange}
                className="form-control"
                id="username"
                placeholder="Elige un nombre de usuario"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="email" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="form-control"
                id="email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                className="form-control"
                id="password"
                placeholder="Crea una contraseña segura"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="rol" className="input-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Rol
              </label>
              <select name="rol" value={inputs.rol} onChange={handleChange} className="form-select" id="rol" required>
                <option value="" disabled>
                  Selecciona un rol
                </option>
                <option value={1}>ADMIN</option>
                <option value={2}>USER</option>
              </select>
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
              <button className="btn btn-fullwidth" type="submit" disabled={isLoading}>
                {isLoading ? "Registrando..." : "Registrarse"}
              </button>
            </div>

            <p className="login-link">
              ¿Ya tienes cuenta? <Link to="/auth/login">Inicia sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
