import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const StadiumIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
    <polyline points="17 2 12 7 7 2" />
  </svg>
)

const CalendarIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const MoneyIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const StatusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
)

const CheckIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const DocumentIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)

export function ViewReservas() {
  const [reservas, setReservas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchReservas = async () => {
      setIsLoading(true)
      const token = localStorage.getItem("token")
      const rol = localStorage.getItem("rol")

      let url = "https://reservas-cancha-1.onrender.com/api/v1/reserva"
      if (rol === "CLIENTE") {
        url = "https://reservas-cancha-1.onrender.com/api/v1/reserva/cliente"
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Reservas obtenidas:", response.data)
        setReservas(response.data)
      } catch (err) {
        console.error("Error al cargar reservas:", err)
        setError("Error al cargar las reservas.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchReservas()
  }, [])

  if (isLoading) {
    return (
      <div
        className="text-center mt-5"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#e2e8f0",
          fontSize: "1.25rem",
          fontWeight: "500",
        }}
      >
        <div>
          <div className="spinner-border text-success mb-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <div>Cargando reservas...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: "2rem",
        }}
      >
        <div
          className="alert alert-danger"
          style={{
            maxWidth: "500px",
            background: "rgba(220, 38, 38, 0.1)",
            border: "1px solid rgba(220, 38, 38, 0.3)",
            color: "#fca5a5",
            borderRadius: "12px",
            padding: "1.5rem",
          }}
        >
          {error}
        </div>
      </div>
    )
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
        overflow: hidden;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      
      .full-screen-container {
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        padding: 2rem;
        box-sizing: border-box;
        overflow-y: auto;
        align-items: center;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        position: relative;
      }
      
      .full-screen-container::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
          radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
        pointer-events: none;
        z-index: 0;
      }
      
      .full-screen-container > * {
        position: relative;
        z-index: 1;
      }
      
      .button-container {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
        width: 100%;
      }
      
      .btn-secondary {
        background: rgba(30, 41, 59, 0.8) !important;
        border: 1px solid rgba(148, 163, 184, 0.2) !important;
        color: #e2e8f0 !important;
        padding: 0.75rem 1.5rem !important;
        border-radius: 10px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        backdrop-filter: blur(10px);
      }
      
      .btn-secondary:hover {
        background: rgba(16, 185, 129, 0.2) !important;
        border-color: rgba(16, 185, 129, 0.5) !important;
        color: #10b981 !important;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);
      }
      
      h3 {
        color: #f1f5f9;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 2.5rem;
        text-align: center;
        letter-spacing: -0.02em;
        text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      
      .reserva-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 2rem;
        justify-content: center;
        width: 100%;
        max-width: 1400px;
        padding-bottom: 2rem;
      }
      
      .card {
        width: 100% !important;
        height: auto !important;
        min-height: 320px;
        background: rgba(30, 41, 59, 0.6) !important;
        border: 1px solid rgba(148, 163, 184, 0.15) !important;
        border-radius: 16px !important;
        overflow: hidden;
        transition: all 0.3s ease !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }
      
      .card:hover {
        transform: translateY(-8px);
        border-color: rgba(16, 185, 129, 0.4) !important;
        box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(16, 185, 129, 0.1);
      }
      
      .card-body {
        padding: 1.75rem !important;
        color: #e2e8f0;
      }
      
      .card-title {
        color: #10b981 !important;
        font-size: 1.5rem !important;
        font-weight: 700 !important;
        margin-bottom: 1.25rem !important;
        padding-bottom: 1rem;
        border-bottom: 2px solid rgba(16, 185, 129, 0.2);
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .info-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
        padding: 0.5rem;
        border-radius: 8px;
        transition: background 0.2s ease;
      }
      
      .info-row:hover {
        background: rgba(148, 163, 184, 0.05);
      }
      
      .info-row svg {
        flex-shrink: 0;
        color: #10b981;
      }
      
      .precio-highlight {
        color: #10b981 !important;
        font-size: 1.1rem;
        font-weight: 700;
      }
      
      .estado-badge {
        display: inline-block;
        padding: 0.35rem 0.85rem;
        border-radius: 20px;
        font-weight: 600;
        font-size: 0.85rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-left: 0.5rem;
      }
      
      .estado-confirmada {
        background: rgba(16, 185, 129, 0.2);
        color: #10b981;
        border: 1px solid rgba(16, 185, 129, 0.3);
      }
      
      .estado-pendiente {
        background: rgba(251, 191, 36, 0.2);
        color: #fbbf24;
        border: 1px solid rgba(251, 191, 36, 0.3);
      }
      
      .estado-cancelada {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        border: 1px solid rgba(239, 68, 68, 0.3);
      }
      
      .text-center {
        color: #94a3b8;
        font-size: 1.25rem;
        font-weight: 500;
      }
      
      @media (max-width: 768px) {
        .full-screen-container {
          padding: 1rem;
        }
        
        .reserva-grid {
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }
        
        .card-text strong {
          min-width: 140px;
        }
      }
      
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

      <div className="full-screen-container">
        <div className="button-container">
          <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
            ← Regresar al Dashboard
          </button>
        </div>

        <h3>Mis Reservas</h3>

        {reservas.length === 0 ? (
          <div className="text-center">No tienes reservas.</div>
        ) : (
          <div className="reserva-grid">
            {reservas.map((reserva) => (
              <div key={reserva.id}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <StadiumIcon />
                      Reserva #{reserva.id}
                    </h5>
                    <div className="card-text">
                      <div className="info-row">
                        <StadiumIcon />
                        <strong>Cancha ID:</strong> {reserva.canchaId}
                      </div>
                      <div className="info-row">
                        <CalendarIcon />
                        <strong>Fecha de reserva:</strong> {new Date(reserva.fecha_reserva).toLocaleDateString()}
                      </div>
                      <div className="info-row">
                        <ClockIcon />
                        <strong>Hora:</strong> {reserva.hora_inicio} - {reserva.hora_fin}
                      </div>
                      <div className="info-row">
                        <MoneyIcon />
                        <strong>Precio total:</strong> <span className="precio-highlight">${reserva.precio_total}</span>
                      </div>
                      <div className="info-row">
                        <StatusIcon />
                        <strong>Estado:</strong>
                        <span
                          className={`estado-badge ${
                            reserva.estado.toLowerCase() === "confirmada"
                              ? "estado-confirmada"
                              : reserva.estado.toLowerCase() === "pendiente"
                                ? "estado-pendiente"
                                : "estado-cancelada"
                          }`}
                        >
                          {reserva.estado}
                        </span>
                      </div>
                      {reserva.fecha_confirmacion && (
                        <div className="info-row">
                          <CheckIcon />
                          <strong>Fecha confirmación:</strong>{" "}
                          {new Date(reserva.fecha_confirmacion).toLocaleDateString()}
                        </div>
                      )}
                      <div className="info-row">
                        <DocumentIcon />
                        <strong>Fecha de solicitud:</strong> {new Date(reserva.fecha_solicitud).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
