import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ViewReservas() {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "https://reservas-cancha-1.onrender.com/api/v1/reserva/cliente",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log("Reservas obtenidas:", response.data);
        setReservas(response.data);  
      } catch (err) {
        console.error("Error al cargar reservas:", err);
        setError("Error al cargar las reservas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservas();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-5">Cargando reservas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">{error}</div>;
  }

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          overflow: hidden;
        }
        .full-screen-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          padding: 1rem 2rem;
          box-sizing: border-box;
          overflow-y: auto;
          align-items: center;
        }
        .reserva-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          justify-content: center;
          justify-items: center;
        }
        .card {
          width: 350px !important;
          height: 300px !important;
          overflow: auto;
        }
        .button-container {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
          width: 100%;
        }
      `}</style>

      <div className="full-screen-container">
        <div className="button-container">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Regresar al Dashboard
          </button>
        </div>

        <h3 className="mb-4 text-center">Mis Reservas</h3>

        {reservas.length === 0 ? (
          <div className="text-center">No tienes reservas.</div>
        ) : (
          <div className="reserva-grid">
            {reservas.map((reserva) => (
              <div key={reserva.id}>
                <div className="card shadow h-100">
                  <div className="card-body">
                    <h5 className="card-title">Reserva #{reserva.id}</h5>
                    <p className="card-text">
                      <strong>Cancha ID:</strong> {reserva.canchaId} <br />
                      <strong>Fecha de reserva:</strong>{" "}
                      {new Date(reserva.fecha_reserva).toLocaleDateString()} <br />
                      <strong>Hora:</strong> {reserva.hora_inicio} - {reserva.hora_fin} <br />
                      <strong>Precio total:</strong> ${reserva.precio_total} <br />
                      <strong>Estado:</strong> {reserva.estado} <br />
                      {reserva.fecha_confirmacion && (
                        <>
                          <strong>Fecha confirmación:</strong>{" "}
                          {new Date(reserva.fecha_confirmacion).toLocaleDateString()} <br />
                        </>
                      )}
                      <strong>Fecha de solicitud:</strong>{" "}
                      {new Date(reserva.fecha_solicitud).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}