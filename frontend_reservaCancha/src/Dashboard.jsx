import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0
    }}>
      {/* Barra de navegación estilizada */}
      <Navbar
        expand="lg"
        style={{
          background: 'linear-gradient(90deg, #0061ff 0%, #60efff 100%)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.07)'
        }}
        className="w-100"
      >
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate('/dashboard')}
            style={{
              cursor: 'pointer',
              fontWeight: 700,
              color: '#fff',
              fontSize: '1.5rem',
              letterSpacing: 1,
              marginRight: '2rem'
            }}
          >
            ReservaCancha
          </Navbar.Brand>
          <Nav className="ms-auto flex-nowrap">
            <Nav.Link style={{ color: '#fff' }} onClick={() => navigate('/cancha/create')}>Crear Cancha</Nav.Link>
            <Nav.Link style={{ color: '#fff' }} onClick={() => navigate('/canchas')}>Ver Canchas</Nav.Link>
            <Nav.Link style={{ color: '#fff' }} onClick={() => navigate('/reserva/create')}>Reservar</Nav.Link>
            <Nav.Link style={{ color: '#fff' }} onClick={() => navigate('/reservas')}>Reservas</Nav.Link>
            <Button
              variant="danger"
              onClick={handleLogout}
              style={{
                fontWeight: 600,
                marginLeft: 16,
                border: 'none',
                borderRadius: '10px',
                padding: '8px 18px',
                background: 'linear-gradient(90deg, #ff354a 0%, #ff7f50 100%)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.11)'
              }}
            >
              Cerrar sesión
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Mensaje centrado en pantalla */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'left', width: '100%', maxWidth: 920, paddingLeft: 30 }}>
          <h2 className="text-secondary" style={{ fontSize: '2.4rem', fontWeight: 400 }}>
            Bienvenido a la app de reservas de canchas ⚽🏀🎾
          </h2>
          <h4 className="text-muted mt-3" style={{ fontWeight: 300 }}>
            Selecciona una opción del menú
          </h4>
        </div>
      </div>
    </div>
  );
}
