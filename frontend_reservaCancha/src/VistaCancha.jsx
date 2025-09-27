import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ViewCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanchas = async () => {
      const token = localStorage.getItem("token");
      const rol = localStorage.getItem("rol");
      const isCliente = rol === "CLIENTE";

      let url = "https://reservas-cancha-1.onrender.com/api/v1/cancha?page=1&pageSize=10";
      if (isCliente) {
        url = "https://reservas-cancha-1.onrender.com/api/v1/cancha/cliente";
      }

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Canchas obtenidas:", response);

        const data = response.data;
        const canchasObtenidas = Array.isArray(data) ? data : data.data;
        setCanchas(canchasObtenidas);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las canchas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  const rol = localStorage.getItem("rol");
  const isAdmin = rol === "ADMIN";

  if (isLoading)
    return <div className="text-center mt-5">Cargando canchas...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  return (
    <>
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: #f8f9fa;
        }
        .full-screen-container {
          min-height: 100vh;
          height: auto;
          padding: 2rem 1rem 1rem 1rem;
          box-sizing: border-box;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100vw;
          background-color: #f8f9fa;
        }
        .cancha-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          justify-content: center;
          justify-items: center;
          width: 100%;
          max-width: 1200px;
        }
        .card {
          width: 320px;
        }
        .btn-dashboard {
          align-self: center;
          margin-bottom: 1.5rem;
        }
      `}</style>

      <div className="full-screen-container">
        <button
          type="button"
          className="btn btn-secondary btn-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          Regresar al Dashboard
        </button>

        <h3 className="mb-4 text-center">Lista de Canchas</h3>

        <div className="cancha-grid">
          {canchas.length === 0 ? (
            <div className="text-center col-12">No hay canchas registradas.</div>
          ) : (
            canchas.map((cancha) => (
              <div key={cancha.id} className="card h-100 shadow">
                <img
                  src={cancha.imagen}
                  className="card-img-top"
                  alt={cancha.nombre_cancha}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{cancha.nombre_cancha}</h5>
                  <p className="card-text">
                    <strong>Dirección:</strong> {cancha.direccion} <br />
                    <strong>Precio x hora:</strong> ${cancha.precio_x_hora} <br />
                    <strong>Tipo:</strong> {cancha.tipo_cancha}
                  </p>

                  <div className="mt-3">
                    <strong>Disponibilidad:</strong>
                    <ul className="list-group list-group-flush mt-2">
                      {diasSemana.map((dia) => {
                        const disponibilidad =
                          cancha.disponibilidad_horarios?.[dia];
                        if (!disponibilidad || !disponibilidad.disponible) {
                          return (
                            <li
                              key={dia}
                              className="list-group-item py-1 text-muted"
                            >
                              {dia.charAt(0).toUpperCase() + dia.slice(1)}: No
                              disponible
                            </li>
                          );
                        }
                        return (
                          <li key={dia} className="list-group-item py-1">
                            {dia.charAt(0).toUpperCase() + dia.slice(1)}:{" "}
                            {disponibilidad.inicio} - {disponibilidad.fin}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => navigate(`/cancha/edit/${cancha.id}`)}
                      >
                        Editar Cancha
                      </button>
                      <button
                        className="btn btn-danger w-100 mt-2"
                        onClick={async () => {
                          const token = localStorage.getItem("token");
                          if (window.confirm("¿Seguro que deseas eliminar esta cancha?")) {
                            try {
                              await axios.delete(
                                `https://reservas-cancha-1.onrender.com/api/v1/cancha/${cancha.id}`,
                                { headers: { Authorization: `Bearer ${token}` } }
                              );
                              alert("Cancha eliminada correctamente");
                              setCanchas(canchas.filter((c) => c.id !== cancha.id));
                            } catch (err) {
                              console.error(err);
                              alert("Error al eliminar la cancha");
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
  );
}