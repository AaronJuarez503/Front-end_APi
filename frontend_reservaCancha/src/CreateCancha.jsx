import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const StadiumIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
)

const ImageIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="M21 15l-5-5L5 21" />
  </svg>
)

const LocationIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MoneyIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 4v16" />
  </svg>
)

const TypeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7V4h16v3M9 20h6M12 4v16" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const ClockIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
)

const CheckIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export function FormCancha() {
  const [inputs, setInputs] = useState({
    nombre_cancha: "",
    imagen: "",
    direccion: "",
    precio_x_hora: "",
    tipo_cancha: "",
    disponibilidad_horarios: {
      lunes: { disponible: false, inicio: "", fin: "" },
      martes: { disponible: false, inicio: "", fin: "" },
      miercoles: { disponible: false, inicio: "", fin: "" },
      jueves: { disponible: false, inicio: "", fin: "" },
      viernes: { disponible: false, inicio: "", fin: "" },
      sabado: { disponible: false, inicio: "", fin: "" },
      domingo: { disponible: false, inicio: "", fin: "" },
    },
    estado: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e, dia, campo) => {
    const { type, checked, value } = e.target

    if (inputs.disponibilidad_horarios[dia]) {
      setInputs((prev) => ({
        ...prev,
        disponibilidad_horarios: {
          ...prev.disponibilidad_horarios,
          [dia]: {
            ...prev.disponibilidad_horarios[dia],
            [campo]: type === "checkbox" ? checked : value,
          },
        },
      }))
    } else {
      const { name } = e.target
      setInputs((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      const response = await axios.post("https://reservas-cancha-1.onrender.com/api/v1/cancha", inputs, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })

      setSuccessMessage("¡Cancha creada exitosamente!")
      setInputs({
        nombre_cancha: "",
        imagen: "",
        direccion: "",
        precio_x_hora: "",
        tipo_cancha: "",
        disponibilidad_horarios: {
          lunes: { disponible: false, inicio: "", fin: "" },
          martes: { disponible: false, inicio: "", fin: "" },
          miercoles: { disponible: false, inicio: "", fin: "" },
          jueves: { disponible: false, inicio: "", fin: "" },
          viernes: { disponible: false, inicio: "", fin: "" },
          sabado: { disponible: false, inicio: "", fin: "" },
          domingo: { disponible: false, inicio: "", fin: "" },
        },
        estado: true,
      })
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Error al conectar con el servidor")
    } finally {
      setIsLoading(false)
    }
  }

  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          font-family: 'Inter', sans-serif;
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
          justify-content: flex-start;
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
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
          animation: rotate 20s linear infinite;
          pointer-events: none;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .form-card {
          width: 100%;
          max-width: 700px;
          border-radius: 1.5rem;
          padding: 2.5rem;
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 1;
        }

        .form-card h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #10b981;
          font-size: 2rem;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }

        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          padding: 0.75rem 1.5rem;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 0.75rem;
          color: #10b981;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .back-button:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: #10b981;
          transform: translateX(-5px);
        }

        .input-group {
          margin-bottom: 1.5rem;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          width: fit-content;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #10b981;
        }

        .form-control, .form-select {
          width: 100% !important;
          min-width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 0.875rem 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 0.75rem;
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .form-control:focus, .form-select:focus {
          outline: none;
          border-color: #10b981;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-control::placeholder {
          color: #64748b;
        }

        .disponibilidad-container {
          margin-bottom: 1.5rem;
        }

        .disponibilidad-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .day-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .day-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(15, 23, 42, 0.8);
        }

        .day-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .form-check-input {
          width: 1.25rem;
          height: 1.25rem;
          border: 2px solid rgba(16, 185, 129, 0.5);
          background: rgba(15, 23, 42, 0.6);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .form-check-input:checked {
          background-color: #10b981;
          border-color: #10b981;
        }

        .form-check-input:focus {
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .form-check-label {
          color: #e2e8f0;
          font-weight: 600;
          cursor: pointer;
          text-transform: capitalize;
        }

        .time-inputs {
          display: flex;
          gap: 1rem;
          margin-top: 0.75rem;
        }

        .time-input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .time-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .time-label .icon {
          width: 16px;
          height: 16px;
        }

        input[type="time"] {
          padding: 0.75rem;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 0.5rem;
          color: #e2e8f0;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        input[type="time"]:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .estado-check {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .alert {
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-danger {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.5);
          color: #fca5a5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.5);
          color: #6ee7b7;
        }

        .btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .btn-success:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
        }

        .btn-success:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: rgba(71, 85, 105, 0.8);
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.3);
          margin-top: 1rem;
        }

        .btn-secondary:hover {
          background: rgba(71, 85, 105, 1);
          border-color: rgba(148, 163, 184, 0.5);
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 1.5rem;
          }

          .back-button {
            top: 1rem;
            left: 1rem;
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }

          .time-inputs {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="full-screen-form-container">
        <button type="button" className="back-button" onClick={() => navigate("/dashboard")}>
          ← Regresar al Dashboard
        </button>

        <div className="form-card">
          <h3>Crear Cancha</h3>

          <form onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="input-group">
              <label className="input-label" htmlFor="nombre_cancha">
                <StadiumIcon />
                Nombre de la cancha
              </label>
              <input
                type="text"
                name="nombre_cancha"
                value={inputs.nombre_cancha}
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="nombre_cancha"
                placeholder="Ej: Cancha Central"
                required
              />
            </div>

            {/* Imagen */}
            <div className="input-group">
              <label className="input-label" htmlFor="imagen">
                <ImageIcon />
                Imagen (URL)
              </label>
              <input
                type="text"
                name="imagen"
                value={inputs.imagen}
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="imagen"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>

            {/* Dirección */}
            <div className="input-group">
              <label className="input-label" htmlFor="direccion">
                <LocationIcon />
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={inputs.direccion}
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="direccion"
                placeholder="Calle, número, ciudad"
                required
              />
            </div>

            {/* Precio */}
            <div className="input-group">
              <label className="input-label" htmlFor="precio_x_hora">
                <MoneyIcon />
                Precio por hora
              </label>
              <input
                type="text"
                name="precio_x_hora"
                value={inputs.precio_x_hora}
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="precio_x_hora"
                placeholder="Ej: $50"
                required
              />
            </div>

            {/* Tipo de cancha */}
            <div className="input-group">
              <label className="input-label" htmlFor="tipo_cancha">
                <TypeIcon />
                Tipo de cancha
              </label>
              <input
                type="text"
                name="tipo_cancha"
                value={inputs.tipo_cancha}
                onChange={(e) => handleChange(e)}
                className="form-control"
                id="tipo_cancha"
                placeholder="Ej: Sintética, Natural, etc..."
                required
              />
            </div>

            {/* Disponibilidad de horarios */}
            <div className="disponibilidad-container">
              <div className="disponibilidad-header">
                <CalendarIcon />
                Disponibilidad de horarios
              </div>
              {diasSemana.map((dia) => (
                <div key={dia} className="day-card">
                  <div className="day-header">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={dia}
                      checked={inputs.disponibilidad_horarios[dia].disponible}
                      onChange={(e) => handleChange(e, dia, "disponible")}
                    />
                    <label className="form-check-label" htmlFor={dia}>
                      {dia.charAt(0).toUpperCase() + dia.slice(1)}
                    </label>
                  </div>
                  {inputs.disponibilidad_horarios[dia].disponible && (
                    <div className="time-inputs">
                      <div className="time-input-group">
                        <label className="time-label">
                          <ClockIcon />
                          Inicio
                        </label>
                        <input
                          type="time"
                          value={inputs.disponibilidad_horarios[dia].inicio}
                          onChange={(e) => handleChange(e, dia, "inicio")}
                        />
                      </div>
                      <div className="time-input-group">
                        <label className="time-label">
                          <ClockIcon />
                          Fin
                        </label>
                        <input
                          type="time"
                          value={inputs.disponibilidad_horarios[dia].fin}
                          onChange={(e) => handleChange(e, dia, "fin")}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Estado */}
            <div className="estado-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="estado"
                id="estado"
                checked={inputs.estado}
                onChange={(e) => handleChange(e)}
              />
              <label className="form-check-label" htmlFor="estado">
                <CheckIcon style={{ display: "inline", width: "16px", height: "16px", marginRight: "0.5rem" }} />
                Cancha activa
              </label>
            </div>

            {/* Alertas */}
            {error && <div className="alert alert-danger">⚠️ {error}</div>}
            {successMessage && <div className="alert alert-success">✓ {successMessage}</div>}

            {/* Botones */}
            <button className="btn btn-success" type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Cancha"}
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </>
  )
}