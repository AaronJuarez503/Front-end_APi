import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const StadiumIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="8" width="18" height="12" rx="2" />
    <path d="M3 8V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2" />
    <line x1="12" y1="8" x2="12" y2="20" />
    <line x1="3" y1="14" x2="21" y2="14" />
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const TypeIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18" />
    <path d="M15 3v18" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ClockIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export function ViewCanchas() {
  const [canchas, setCanchas] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCanchas = async () => {
      const token = localStorage.getItem("token")
      const rol = localStorage.getItem("rol")
      const isCliente = rol === "CLIENTE"

      let url = "https://reservas-cancha-1.onrender.com/api/v1/cancha?page=1&pageSize=10"
      if (isCliente) {
        url = "https://reservas-cancha-1.onrender.com/api/v1/cancha/cliente"
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("Canchas obtenidas:", response)

        const data = response.data
        const canchasObtenidas = Array.isArray(data) ? data : data.data
        setCanchas(canchasObtenidas)
      } catch (err) {
        console.error(err)
        setError("Error al cargar las canchas.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCanchas()
  }, [])

  const rol = localStorage.getItem("rol")
  const isAdmin = rol === "ADMIN"

  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]

  if (isLoading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando canchas...</p>
      </div>
    )

  if (error)
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    )

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body, #root {
          height: 100%;
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .full-screen-container {
          min-height: 100vh;
          width: 100vw;
          padding: 2rem 1rem;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%);
          position: relative;
          overflow-x: hidden;
        }

        .full-screen-container::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
          animation: rotate 30s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .full-screen-container > * {
          position: relative;
          z-index: 1;
        }

        .btn-dashboard {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 auto 2rem;
          display: block;
          font-size: 0.95rem;
        }

        .btn-dashboard:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(16, 185, 129, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.2);
        }

        h3 {
          color: #fff;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .cancha-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(16, 185, 129, 0.5);
          box-shadow: 0 20px 60px rgba(16, 185, 129, 0.2);
        }

        .card-img-top {
          height: 220px;
          object-fit: cover;
          width: 100%;
          transition: transform 0.4s ease;
        }

        .card:hover .card-img-top {
          transform: scale(1.05);
        }

        .card-body {
          padding: 1.5rem;
          color: #fff;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-text {
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.8;
          margin-bottom: 1rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .info-item strong {
          color: #10b981;
          font-weight: 600;
        }

        .icon {
          width: 18px;
          height: 18px;
          color: #10b981;
          flex-shrink: 0;
        }

        .disponibilidad-section {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .disponibilidad-section strong {
          color: #10b981;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .list-group {
          background: transparent;
          border: none;
        }

        .list-group-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.9);
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .list-group-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .list-group-item.text-muted {
          color: rgba(255, 255, 255, 0.4) !important;
          opacity: 0.6;
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 1rem;
          font-size: 0.95rem;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          border: none;
          color: #fff;
          padding: 0.75rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-top: 0.75rem;
          font-size: 0.95rem;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.4);
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%);
          color: #fff;
        }

        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(16, 185, 129, 0.2);
          border-top-color: #10b981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .loading-container p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%);
          padding: 2rem;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 1.5rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          backdrop-filter: blur(10px);
        }

        .text-center {
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
          padding: 3rem;
          grid-column: 1 / -1;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }

        @media (min-width: 769px) and (max-width: 1200px) {
          .cancha-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cancha-grid {
            grid-template-columns: 1fr;
            padding: 0 0.5rem;
          }

          h3 {
            font-size: 1.5rem;
          }

          .card-title {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="full-screen-container">
        <button type="button" className="btn-dashboard" onClick={() => navigate("/dashboard")}>
          ← Regresar al Dashboard
        </button>

        <h3>Lista de Canchas</h3>

        <div className="cancha-grid">
          {canchas.length === 0 ? (
            <div className="text-center">No hay canchas registradas.</div>
          ) : (
            canchas.map((cancha) => (
              <div key={cancha.id} className="card">
                <img src={cancha.imagen || "/placeholder.svg"} className="card-img-top" alt={cancha.nombre_cancha} />
                <div className="card-body">
                  <h5 className="card-title">
                    <StadiumIcon />
                    {cancha.nombre_cancha}
                  </h5>

                  <div className="info-item">
                    <LocationIcon />
                    <span>
                      <strong>Dirección:</strong> {cancha.direccion}
                    </span>
                  </div>

                  <div className="info-item">
                    <MoneyIcon />
                    <span>
                      <strong>Precio x hora:</strong> ${cancha.precio_x_hora}
                    </span>
                  </div>

                  <div className="info-item">
                    <TypeIcon />
                    <span>
                      <strong>Tipo:</strong> {cancha.tipo_cancha}
                    </span>
                  </div>

                  <div className="disponibilidad-section">
                    <strong>
                      <CalendarIcon />
                      Disponibilidad:
                    </strong>
                    <ul className="list-group">
                      {diasSemana.map((dia) => {
                        const disponibilidad = cancha.disponibilidad_horarios?.[dia]
                        if (!disponibilidad || !disponibilidad.disponible) {
                          return (
                            <li key={dia} className="list-group-item text-muted">
                              {dia.charAt(0).toUpperCase() + dia.slice(1)}: No disponible
                            </li>
                          )
                        }
                        return (
                          <li key={dia} className="list-group-item">
                            <ClockIcon />
                            {dia.charAt(0).toUpperCase() + dia.slice(1)}: {disponibilidad.inicio} - {disponibilidad.fin}
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {isAdmin && (
                    <>
                      <button className="btn-primary" onClick={() => navigate(`/cancha/edit/${cancha.id}`)}>
                        Editar Cancha
                      </button>
                      <button
                        className="btn-danger"
                        onClick={async () => {
                          const token = localStorage.getItem("token")
                          if (window.confirm("¿Seguro que deseas eliminar esta cancha?")) {
                            try {
                              await axios.delete(`https://reservas-cancha-1.onrender.com/api/v1/cancha/${cancha.id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              })
                              alert("Cancha eliminada correctamente")
                              setCanchas(canchas.filter((c) => c.id !== cancha.id))
                            } catch (err) {
                              console.error(err)
                              alert("Error al eliminar la cancha")
                            }
                          }
                        }}
                      >
                        Eliminar Cancha
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
