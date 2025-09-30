import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const StadiumIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 3v18" />
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
    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="M22 4L12 14.01l-3-3" />
  </svg>
)

export function FormEditCancha() {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

  useEffect(() => {
    const fetchCancha = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.get(`https://reservas-cancha-1.onrender.com/api/v1/cancha/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setInputs(response.data)
      } catch (err) {
        console.error(err)
        setError("Error al cargar los datos de la cancha.")
      }
    }
    fetchCancha()
  }, [id])

  const handleChange = (e, dia, campo) => {
    const { type, checked, value } = e.target
    if (dia && campo) {
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
      await axios.put(`https://reservas-cancha-1.onrender.com/api/v1/cancha/${id}`, inputs, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      setSuccessMessage("¡Cancha actualizada exitosamente!")
      navigate("/canchas")
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || "Error al actualizar la cancha")
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
          font-family: 'Inter', sans-serif;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #10b981;
          flex-shrink: 0;
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
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
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
          max-width: 700px;
          border-radius: 1.5rem;
          padding: 2.5rem;
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.1);
          position: relative;
          z-index: 1;
        }

        .form-card h3 {
          color: #10b981;
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }

        .input-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          min-width: 0;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 600;
          font-size: 0.95rem;
          width: fit-content;
        }

        .form-control {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          height: 3rem;
          padding: 0.75rem 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 0.75rem;
          color: #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1), 0 0 20px rgba(16, 185, 129, 0.2);
          background: rgba(15, 23, 42, 0.8);
        }

        .form-control::placeholder {
          color: #64748b;
        }

        .disponibilidad-section {
          margin-bottom: 1.5rem;
        }

        .disponibilidad-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #10b981;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .dia-card {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .dia-card:hover {
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(15, 23, 42, 0.8);
        }

        .dia-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .dia-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #10b981;
        }

        .dia-checkbox label {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          text-transform: capitalize;
        }

        .horarios-inputs {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .horario-input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .horario-label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .horario-label .icon {
          width: 16px;
          height: 16px;
        }

        .horario-input-group input[type="time"] {
          height: 2.5rem;
          font-size: 0.9rem;
        }

        .estado-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 0.75rem;
        }

        .estado-checkbox input[type="checkbox"] {
          width: 20px;
          height: 20px;
          cursor: pointer;
          accent-color: #10b981;
        }

        .estado-checkbox label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #e2e8f0;
          font-weight: 600;
          cursor: pointer;
        }

        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .alert-danger {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #fca5a5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }

        .btn {
          width: 100%;
          min-height: 3rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(16, 185, 129, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: rgba(71, 85, 105, 0.6);
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.3);
          margin-top: 0.75rem;
        }

        .btn-secondary:hover {
          background: rgba(71, 85, 105, 0.8);
          border-color: rgba(148, 163, 184, 0.5);
          transform: translateY(-2px);
        }

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
      `}</style>

      <div className="full-screen-form-container">
        <div className="form-card">
          <h3>Editar Cancha</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">
                <StadiumIcon />
                Nombre de la cancha
              </label>
              <input
                type="text"
                name="nombre_cancha"
                value={inputs.nombre_cancha}
                onChange={(e) => handleChange(e)}
                className="form-control"
                placeholder="Ej: Cancha Futbol 5"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <ImageIcon />
                Imagen (URL)
              </label>
              <input
                type="text"
                name="imagen"
                value={inputs.imagen}
                onChange={(e) => handleChange(e)}
                className="form-control"
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <LocationIcon />
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={inputs.direccion}
                onChange={(e) => handleChange(e)}
                className="form-control"
                placeholder="Calle, número, ciudad"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <MoneyIcon />
                Precio por hora
              </label>
              <input
                type="text"
                name="precio_x_hora"
                value={inputs.precio_x_hora}
                onChange={(e) => handleChange(e)}
                className="form-control"
                placeholder="Ej: $50"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                <TypeIcon />
                Tipo de cancha
              </label>
              <input
                type="text"
                name="tipo_cancha"
                value={inputs.tipo_cancha}
                onChange={(e) => handleChange(e)}
                className="form-control"
                placeholder="Ej: Sintética, Natural"
                required
              />
            </div>

            <div className="disponibilidad-section">
              <div className="disponibilidad-title">
                <CalendarIcon />
                Disponibilidad de horarios
              </div>
              {diasSemana.map((dia) => (
                <div key={dia} className="dia-card">
                  <div className="dia-checkbox">
                    <input
                      type="checkbox"
                      id={dia}
                      checked={inputs.disponibilidad_horarios[dia]?.disponible}
                      onChange={(e) => handleChange(e, dia, "disponible")}
                    />
                    <label htmlFor={dia}>{dia.charAt(0).toUpperCase() + dia.slice(1)}</label>
                  </div>
                  {inputs.disponibilidad_horarios[dia]?.disponible && (
                    <div className="horarios-inputs">
                      <div className="horario-input-group">
                        <label className="horario-label">
                          <ClockIcon />
                          Inicio
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          value={inputs.disponibilidad_horarios[dia].inicio}
                          onChange={(e) => handleChange(e, dia, "inicio")}
                        />
                      </div>
                      <div className="horario-input-group">
                        <label className="horario-label">
                          <ClockIcon />
                          Fin
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          value={inputs.disponibilidad_horarios[dia].fin}
                          onChange={(e) => handleChange(e, dia, "fin")}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="estado-checkbox">
              <input
                type="checkbox"
                name="estado"
                id="estado"
                checked={inputs.estado}
                onChange={(e) => handleChange(e)}
              />
              <label htmlFor="estado">
                <CheckIcon />
                Activa
              </label>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <button className="btn btn-primary" type="submit" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar Cancha"}
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => navigate("/canchas")}>
              Regresar a Canchas
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
