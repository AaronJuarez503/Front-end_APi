"use client"

import { useEffect, useState } from "react"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
  const navigate = useNavigate()
  const [rol, setRol] = useState(null)

  useEffect(() => {
    setRol(localStorage.getItem("rol"))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("rol")
    navigate("/auth/login")
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        .dashboard-container {
          min-height: 100vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%);
          position: relative;
          overflow-x: hidden;
        }

        .dashboard-container::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
          animation: rotate-light 20s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes rotate-light {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .modern-navbar {
          background: rgba(15, 23, 42, 0.85) !important;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
          position: relative;
          z-index: 10;
        }

        .navbar-brand-custom {
          cursor: pointer;
          font-weight: 800;
          color: #10b981 !important;
          font-size: 1.5rem;
          letter-spacing: 0.5px;
          margin-right: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .navbar-brand-custom:hover {
          color: #34d399 !important;
          transform: translateY(-1px);
        }

        .nav-link-custom {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          margin: 0 0.25rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link-custom::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #10b981;
          transition: width 0.3s ease;
        }

        .nav-link-custom:hover {
          color: #10b981 !important;
          background: rgba(16, 185, 129, 0.1);
        }

        .nav-link-custom:hover::before {
          width: 80%;
        }

        .logout-button {
          font-weight: 600;
          margin-left: 16px;
          border: none;
          border-radius: 10px;
          padding: 8px 18px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          color: white;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
          transform: translateY(-2px);
        }

        .welcome-section {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 2rem;
        }

        .welcome-content {
          text-align: left;
          width: 100%;
          max-width: 920px;
          padding: 3rem;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }

        .welcome-title {
          font-size: 2.4rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .welcome-subtitle {
          font-size: 1.25rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 1rem;
        }

        .sports-icons {
          display: inline-flex;
          gap: 0.75rem;
          align-items: center;
        }

        .sport-icon {
          width: 40px;
          height: 40px;
          padding: 8px;
          background: rgba(16, 185, 129, 0.15);
          border-radius: 12px;
          border: 1px solid rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
        }

        .sport-icon:hover {
          background: rgba(16, 185, 129, 0.25);
          transform: translateY(-2px) rotate(5deg);
        }

        .logo-icon {
          width: 32px;
          height: 32px;
        }

        /* Scrollbar personalizado */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
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
          .welcome-title {
            font-size: 1.8rem;
          }

          .welcome-subtitle {
            font-size: 1rem;
          }

          .welcome-content {
            padding: 2rem;
          }

          .navbar-brand-custom {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <Navbar expand="lg" className="modern-navbar w-100">
          <Container fluid>
            <Navbar.Brand onClick={() => navigate("/dashboard")} className="navbar-brand-custom">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
                <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2" />
                <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" />
              </svg>
              ReservaCancha
            </Navbar.Brand>
            <Nav className="ms-auto flex-nowrap">
              {rol === "ADMIN" && (
                <>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/cancha/create")}>
                    Crear Cancha
                  </Nav.Link>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/canchas")}>
                    Ver Canchas
                  </Nav.Link>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/reservas")}>
                    Reservas
                  </Nav.Link>
                </>
              )}
              {rol === "CLIENTE" && (
                <>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/canchas")}>
                    Ver Canchas
                  </Nav.Link>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/reserva/create")}>
                    Reservar
                  </Nav.Link>
                  <Nav.Link className="nav-link-custom" onClick={() => navigate("/reservas")}>
                    Reservas
                  </Nav.Link>
                </>
              )}
              <Button variant="danger" onClick={handleLogout} className="logout-button">
                Cerrar sesión
              </Button>
            </Nav>
          </Container>
        </Navbar>

        <div className="welcome-section">
          <div className="welcome-content">
            <h2 className="welcome-title">
              Bienvenido a la app de reservas de canchas
            </h2>
            <h4 className="welcome-subtitle">Selecciona una opción del menú</h4>
          </div>
        </div>
      </div>
    </>
  )
}
