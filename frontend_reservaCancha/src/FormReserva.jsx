import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function FormReserva() {
  const [inputs, setInputs] = useState({
    canchaId: "",
    fecha_reserva: "",
    hora_inicio: "",
    hora_fin: "",
    precio_total: "",
    estado: "pendiente",
    fecha_solicitud: new Date().toISOString(),
    fecha_confirmacion: new Date().toISOString(),
  })

  const [canchas, setCanchas] = useState([])
  const [selectedCancha, setSelectedCancha] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("https://reservas-cancha-1.onrender.com/api/v1/cancha/cliente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCanchas(response.data)
      } catch (err) {
        console.error("Error al obtener canchas:", err)
        setError("No se pudieron cargar las canchas.")
      }
    }

    fetchCanchas()
  }, [])

  const calcularPrecioTotal = (hora_inicio, hora_fin, cancha) => {
    if (!hora_inicio || !hora_fin || !cancha) return

    const [hInicio, mInicio] = hora_inicio.split(":").map(Number)
    const [hFin, mFin] = hora_fin.split(":").map(Number)

    const inicio = hInicio + mInicio / 60
    const fin = hFin + mFin / 60

    const duracion = Math.max(fin - inicio, 0)
    const precio = duracion * Number.parseFloat(cancha.precio_x_hora || 0)

    setInputs((prev) => ({
      ...prev,
      precio_total: precio.toFixed(2),
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === "canchaId") {
      const cancha = canchas.find((c) => c.id === Number.parseInt(value))
      setSelectedCancha(cancha)
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }))
      calcularPrecioTotal(inputs.hora_inicio, inputs.hora_fin, cancha)
    } else if (name === "hora_inicio" || name === "hora_fin") {
      setInputs((prev) => {
        const updatedInputs = {
          ...prev,
          [name]: value,
        }
        calcularPrecioTotal(
          name === "hora_inicio" ? value : prev.hora_inicio,
          name === "hora_fin" ? value : prev.hora_fin,
          selectedCancha,
        )
        return updatedInputs
      })
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    setIsLoading(true)
    setError(null)
    setSuccessMessage(null)

    const payload = {
      ...inputs,
      canchaId: Number.parseInt(inputs.canchaId),
      precio_total: Number.parseFloat(inputs.precio_total),
    }

    try {
      const response = await axios.post("https://reservas-cancha-1.onrender.com/api/v1/reserva", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      setSuccessMessage("¡Reserva creada exitosamente!")
      setInputs({
        canchaId: "",
        fecha_reserva: "",
        hora_inicio: "",
        hora_fin: "",
        precio_total: "",
        estado: "pendiente",
        fecha_solicitud: new Date().toISOString(),
        fecha_confirmacion: new Date().toISOString(),
      })
      setSelectedCancha(null)
    } catch (error) {
      console.error("Error al crear reserva:", error)
      setError(error.response?.data?.message || error.message || "Error al conectar con el servidor")
    } finally {
      setIsLoading(false)
    }
  }

  const StadiumIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
      <line x1="12" y1="8" x2="12" y2="20" />
      <line x1="8" y1="12" x2="8" y2="20" />
      <line x1="16" y1="12" x2="16" y2="20" />
    </svg>
  )

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )

  const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )

  const MoneyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )

  const StatusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )

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

        /* Modern dark background with animated gradient */
        .full-screen-form-container {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          box-sizing: border-box;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%);
          position: relative;
          overflow-x: hidden;
        }

        .full-screen-form-container::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Modern glassmorphism card with green accent border */
        .form-card {
          width: 100%;
          max-width: 700px;
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
          margin-bottom: 2rem;
          color: #10b981;
          font-size: 2rem;
          letter-spacing: -0.02em;
        }

        /* Modern input group with vertical layout */
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
          font-size: 0.95rem;
          width: fit-content;
        }

        /* Modern input styling with full width */
        .form-control, .form-select {
          width: 100% !important;
          min-width: 100% !important;
          max-width: 100% !important;
          padding: 0.875rem 1rem !important;
          background: rgba(30, 41, 59, 0.6) !important;
          border: 1px solid rgba(16, 185, 129, 0.3) !important;
          border-radius: 0.75rem !important;
          color: #e2e8f0 !important;
          font-size: 1rem !important;
          transition: all 0.3s ease !important;
          box-sizing: border-box !important;
          font-family: 'Inter', sans-serif !important;
        }

        .form-control:focus, .form-select:focus {
          outline: none !important;
          border-color: #10b981 !important;
          background: rgba(30, 41, 59, 0.8) !important;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
        }

        .form-control:read-only {
          background: rgba(30, 41, 59, 0.4) !important;
          cursor: not-allowed !important;
          opacity: 0.7 !important;
        }

        .form-select option {
          background: #1e293b;
          color: #e2e8f0;
        }

        /* Price info styling */
        .price-info {
          color: #10b981;
          font-size: 0.875rem;
          margin-top: -0.5rem;
          margin-bottom: 1rem;
          padding-left: 0.25rem;
          font-weight: 500;
        }

        /* Modern alert styling */
        .alert {
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 500;
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

        /* Modern button styling */
        .btn-fullwidth {
          width: 100%;
          padding: 0.875rem 1.5rem;
          font-weight: 600;
          font-size: 1rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: rgba(71, 85, 105, 0.6);
          color: #e2e8f0;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(71, 85, 105, 0.8);
          transform: translateY(-2px);
        }

        .d-grid {
          display: grid;
        }

        .mt-2 {
          margin-top: 0.75rem;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="form-card">
          <h3>Crear Reserva</h3>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label" htmlFor="canchaId">
                <StadiumIcon />
                Cancha
              </label>
              <select
                name="canchaId"
                value={inputs.canchaId}
                onChange={handleChange}
                className="form-select"
                id="canchaId"
                required
              >
                <option value="">Selecciona una cancha</option>
                {canchas.map((cancha) => (
                  <option key={cancha.id} value={cancha.id}>
                    {cancha.nombre_cancha}
                  </option>
                ))}
              </select>
            </div>

            {selectedCancha && <div className="price-info">💰 Precio por hora: ${selectedCancha.precio_x_hora}</div>}

            <div className="input-group">
              <label className="input-label" htmlFor="fecha_reserva">
                <CalendarIcon />
                Fecha de la reserva
              </label>
              <input
                type="date"
                name="fecha_reserva"
                value={inputs.fecha_reserva.split("T")[0]}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    fecha_reserva: new Date(e.target.value).toISOString(),
                  }))
                }
                className="form-control"
                id="fecha_reserva"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="hora_inicio">
                <ClockIcon />
                Hora de inicio
              </label>
              <input
                type="time"
                name="hora_inicio"
                value={inputs.hora_inicio}
                onChange={handleChange}
                className="form-control"
                id="hora_inicio"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="hora_fin">
                <ClockIcon />
                Hora de fin
              </label>
              <input
                type="time"
                name="hora_fin"
                value={inputs.hora_fin}
                onChange={handleChange}
                className="form-control"
                id="hora_fin"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="precio_total">
                <MoneyIcon />
                Precio total
              </label>
              <input
                type="number"
                step="0.01"
                name="precio_total"
                value={inputs.precio_total}
                readOnly
                className="form-control"
                id="precio_total"
                required
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="estado">
                <StatusIcon />
                Estado de la reserva
              </label>
              <input type="text" className="form-control" id="estado" name="estado" value={inputs.estado} readOnly />
            </div>

            {/* Alertas */}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            {/* Botones */}
            <div className="d-grid">
              <button className="btn btn-primary btn-fullwidth" type="submit" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Reserva"}
              </button>
            </div>
            <div className="d-grid mt-2">
              <button type="button" className="btn btn-secondary btn-fullwidth" onClick={() => navigate("/dashboard")}>
                Volver al Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
