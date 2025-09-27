import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  });

  const [canchas, setCanchas] = useState([]);
  const [selectedCancha, setSelectedCancha] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://reservas-cancha-1.onrender.com/api/v1/cancha/cliente",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCanchas(response.data);
      } catch (err) {
        console.error("Error al obtener canchas:", err);
        setError("No se pudieron cargar las canchas.");
      }
    };

    fetchCanchas();
  }, []);

  const calcularPrecioTotal = (hora_inicio, hora_fin, cancha) => {
    if (!hora_inicio || !hora_fin || !cancha) return;

    const [hInicio, mInicio] = hora_inicio.split(":").map(Number);
    const [hFin, mFin] = hora_fin.split(":").map(Number);

    const inicio = hInicio + mInicio / 60;
    const fin = hFin + mFin / 60;

    const duracion = Math.max(fin - inicio, 0);
    const precio = duracion * parseFloat(cancha.precio_x_hora || 0);

    setInputs((prev) => ({
      ...prev,
      precio_total: precio.toFixed(2),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "canchaId") {
      const cancha = canchas.find((c) => c.id === parseInt(value));
      setSelectedCancha(cancha);
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
      calcularPrecioTotal(inputs.hora_inicio, inputs.hora_fin, cancha);
    } else if (name === "hora_inicio" || name === "hora_fin") {
      setInputs((prev) => {
        const updatedInputs = {
          ...prev,
          [name]: value,
        };
        calcularPrecioTotal(
          name === "hora_inicio" ? value : prev.hora_inicio,
          name === "hora_fin" ? value : prev.hora_fin,
          selectedCancha
        );
        return updatedInputs;
      });
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const payload = {
      ...inputs,
      canchaId: parseInt(inputs.canchaId),
      precio_total: parseFloat(inputs.precio_total),
    };

    try {
      const response = await axios.post(
        "https://reservas-cancha-1.onrender.com/api/v1/reserva",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("¡Reserva creada exitosamente!");
      setInputs({
        canchaId: "",
        fecha_reserva: "",
        hora_inicio: "",
        hora_fin: "",
        precio_total: "",
        estado: "pendiente",
        fecha_solicitud: new Date().toISOString(),
        fecha_confirmacion: new Date().toISOString(),
      });
      setSelectedCancha(null);
    } catch (error) {
      console.error("Error al crear reserva:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Error al conectar con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        .full-screen-form-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .form-card {
          width: 100%;
          max-width: 600px;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        .form-card h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        .btn-fullwidth {
          width: 100%;
        }
        .alert {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="card form-card shadow">
          <div className="card-body">
            <h3>Crear Reserva</h3>
            <form onSubmit={handleSubmit}>
              {/* Selector de Canchas */}
              <div className="mb-3 form-floating">
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
                <label htmlFor="canchaId">Cancha</label>
              </div>

              {/* Precio por hora */}
              {selectedCancha && (
                <div
                  className="mb-3 text-muted"
                  style={{ marginTop: "-0.5rem" }}
                >
                  <small>Precio por hora: ${selectedCancha.precio_x_hora}</small>
                </div>
              )}

              {/* Fecha de Reserva */}
              <div className="mb-3 form-floating">
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
                <label htmlFor="fecha_reserva">Fecha de la reserva</label>
              </div>

              {/* Hora inicio */}
              <div className="mb-3 form-floating">
                <input
                  type="time"
                  name="hora_inicio"
                  value={inputs.hora_inicio}
                  onChange={handleChange}
                  className="form-control"
                  id="hora_inicio"
                  required
                />
                <label htmlFor="hora_inicio">Hora de inicio</label>
              </div>

              {/* Hora fin */}
              <div className="mb-3 form-floating">
                <input
                  type="time"
                  name="hora_fin"
                  value={inputs.hora_fin}
                  onChange={handleChange}
                  className="form-control"
                  id="hora_fin"
                  required
                />
                <label htmlFor="hora_fin">Hora de fin</label>
              </div>

              {/* Precio total */}
              <div className="mb-3 form-floating">
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
                <label htmlFor="precio_total">Precio total</label>
              </div>

              {/* Estado (solo lectura) */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="estado"
                  name="estado"
                  value={inputs.estado}
                  readOnly
                />
                <label htmlFor="estado">Estado de la reserva</label>
              </div>

              {/* Alertas */}
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              {/* Botones */}
              <div className="d-grid">
                <button
                  className="btn btn-primary btn-fullwidth"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando..." : "Crear Reserva"}
                </button>
              </div>
              <div className="d-grid mt-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-fullwidth"
                  onClick={() => navigate("/dashboard")}
                >
                  Volver al Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}