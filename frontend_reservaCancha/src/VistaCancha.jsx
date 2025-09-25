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
      try {
        const response = await axios.get(
          "https://reservas-cancha-1.onrender.com/api/v1/cancha?page=1&pageSize=10",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Canchas obtenidas:", response);
        setCanchas(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar las canchas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  if (isLoading) return <div className="text-center mt-5">Cargando canchas...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  const diasSemana = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Lista de Canchas</h3>
      <div className="row">
        {canchas.length === 0 ? (
          <div className="col-12 text-center">No hay canchas registradas.</div>
        ) : (
          canchas.map((cancha) => (
            <div className="col-md-4 mb-4" key={cancha.id}>
              <div className="card h-100 shadow">
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
                        const disponibilidad = cancha.disponibilidad_horarios?.[dia];
                        if (!disponibilidad || !disponibilidad.disponible) {
                          return (
                            <li key={dia} className="list-group-item py-1 text-muted">
                              {dia.charAt(0).toUpperCase() + dia.slice(1)}: No disponible
                            </li>
                          );
                        }
                        return (
                          <li key={dia} className="list-group-item py-1">
                            {dia.charAt(0).toUpperCase() + dia.slice(1)}: {disponibilidad.inicio} - {disponibilidad.fin}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

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
                          // Opcional: actualizar la lista local
                          setCanchas(canchas.filter(c => c.id !== cancha.id));
                        } catch (err) {
                          console.error(err);
                          alert("Error al eliminar la cancha");
                        }
                      }
                    }}
                  >
                    Eliminar Cancha
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
