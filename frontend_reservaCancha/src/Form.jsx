"use client"

import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

export function FormLogin() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputs((values) => ({ ...values, [name]: value }))
    console.log(inputs)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    console.log("Enviando datos:", {
      username: inputs.username,
      password: inputs.password,
    })

    try {
      const response = await axios({
        method: "post",
        url: "https://reservas-cancha-1.onrender.com/auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          username: inputs.username,
          password: inputs.password,
        },
      })

      console.log("Respuesta del servidor:", response.data)
      localStorage.setItem("token", response.data.access_token)

      // Decodificamos token para extraer el rol
      const decodedToken = jwtDecode(response.data.access_token)
      const rolUsuario = decodedToken.role || decodedToken.rol || "CLIENTE"

      // Guardamos rol en localStorage
      localStorage.setItem("rol", rolUsuario)

      setSuccessMessage("¡Inicio de sesión exitoso!")
      setInputs({
        username: "",
        password: "",
      })
      navigate("/dashboard")
    } catch (error) {
      console.error("Error completo:", error)
      setError(error.response?.data?.message || error.message || "Error al conectar con el servidor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Modern dark gradient background with animated light effect */
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
          background: linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #0f1922 100%);
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

        /* Modern glassmorphism card with green accent border */
        .form-card {
          width: 100%;
          max-width: 440px;
          border-radius: 1.5rem;
          padding: 3rem 2.5rem;
          background: rgba(15, 25, 34, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.1);
          position: relative;
          z-index: 1;
        }

        /* Modern typography with green accent */
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

        /* Modern input groups with icons */
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          width: 100%;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 600;
          font-size: 0.9rem;
          width: fit-content;
        }

        .input-label svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* Modern input styling with green focus */
        .form-control {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          padding: 0.875rem 1rem !important;
          background: rgba(15, 25, 34, 0.6) !important;
          border: 1px solid rgba(148, 163, 184, 0.2) !important;
          border-radius: 0.75rem !important;
          color: #e2e8f0 !important;
          font-size: 0.95rem !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
          font-family: 'Inter', sans-serif !important;
        }

        .form-control:focus {
          outline: none !important;
          border-color: #10b981 !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
          background: rgba(15, 25, 34, 0.8) !important;
        }

        .form-control::placeholder {
          color: #64748b !important;
        }

        /* Modern alert styling */
        .alert {
          margin-top: 0;
          margin-bottom: 1.5rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          border: none;
          font-size: 0.9rem;
          font-weight: 500;
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

        /* Modern button styling with green accent */
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

        /* Modern link styling */
        .text-center {
          text-align: center;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .text-center a {
          color: #10b981;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .text-center a:hover {
          color: #6ee7b7;
          text-decoration: underline;
        }

        /* Custom scrollbar */
        .full-screen-form-container::-webkit-scrollbar {
          width: 8px;
        }

        .full-screen-form-container::-webkit-scrollbar-track {
          background: rgba(15, 25, 34, 0.5);
        }

        .full-screen-form-container::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 4px;
        }

        .full-screen-form-container::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }

        .d-grid {
          display: grid;
          margin-bottom: 1.5rem;
        }

        .mb-0 {
          margin-bottom: 0;
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="form-card">
          <div className="text-center mb-4">
            <h3>Reserva tu Cancha</h3>
            <p className="text-muted mb-0">inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="username">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Nombre de Usuario
              </label>
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
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">
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
                placeholder="Contraseña"
                required
              />
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

            <div className="d-grid">
              <button className="btn-fullwidth" type="submit" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </div>

            <p className="text-center mb-0">
              ¿No tienes cuenta? <Link to="/auth/register">Regístrate</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
