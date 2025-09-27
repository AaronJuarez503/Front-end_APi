import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function FormCancha() {
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
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e, dia, campo) => {
    const { type, checked, value } = e.target;

    if (inputs.disponibilidad_horarios[dia]) {
      setInputs((prev) => ({
        ...prev,
        disponibilidad_horarios: {
          ...prev.disponibilidad_horarios,
          [dia]: {
            ...prev.disponibilidad_horarios[dia],
            [campo]: type === "checkbox" ? checked : value,
          },
        },
      }));
    } else {
      const { name } = e.target;
      setInputs((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "https://reservas-cancha-1.onrender.com/api/v1/cancha",
        inputs,
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage("¡Cancha creada exitosamente!");
      setInputs({
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
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Error al conectar con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        .full-screen-form-container {
  min-height: 100vh;
  height: auto;
  padding: 2rem 1rem 1rem 1rem;
  box-sizing: border-box;
  overflow-y: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100vw;
  background-color: #f8f9fa;
}


        .form-card {
          width: 100%;
          max-width: 700px;
          border-radius: 1rem;
          padding: 2.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background-color: white;
        }
        .form-card h3 {
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
        }
        .btn-fullwidth {
          width: 100%;
        }
        .alert {
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .disponibilidad-container > div {
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: #fefefe;
        }
        .disponibilidad-container label {
          font-weight: 600;
        }
        .form-floating > input, .form-floating > select {
          height: 3rem;
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="card form-card shadow">
          <div className="card-body">
            <h3>Crear Cancha</h3>

            <form onSubmit={handleSubmit}>
              {/* Nombre */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="nombre_cancha"
                  value={inputs.nombre_cancha}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="nombre_cancha"
                  placeholder="Nombre de la cancha"
                  required
                />
                <label htmlFor="nombre_cancha">Nombre de la cancha</label>
              </div>

              {/* Imagen */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="imagen"
                  value={inputs.imagen}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="imagen"
                  placeholder="URL de la imagen"
                  required
                />
                <label htmlFor="imagen">Imagen (URL)</label>
              </div>

              {/* Dirección */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="direccion"
                  value={inputs.direccion}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="direccion"
                  placeholder="Dirección"
                  required
                />
                <label htmlFor="direccion">Dirección</label>
              </div>

              {/* Precio */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="precio_x_hora"
                  value={inputs.precio_x_hora}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="precio_x_hora"
                  placeholder="Precio por hora"
                  required
                />
                <label htmlFor="precio_x_hora">Precio por hora</label>
              </div>

              {/* Tipo de cancha */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="tipo_cancha"
                  value={inputs.tipo_cancha}
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  id="tipo_cancha"
                  placeholder="Tipo de cancha"
                  required
                />
                <label htmlFor="tipo_cancha">Tipo de cancha</label>
              </div>

              {/* Disponibilidad de horarios */}
              <div className="mb-3 disponibilidad-container">
                <label className="form-label fw-bold">
                  Disponibilidad de horarios
                </label>
                <div className="d-flex flex-column gap-2">
                  {diasSemana.map((dia) => (
                    <div key={dia}>
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={dia}
                          checked={inputs.disponibilidad_horarios[dia].disponible}
                          onChange={(e) => handleChange(e, dia, "disponible")}
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor={dia}
                        >
                          {dia.charAt(0).toUpperCase() + dia.slice(1)}
                        </label>
                      </div>
                      {inputs.disponibilidad_horarios[dia].disponible && (
                        <div className="d-flex gap-2">
                          <div className="form-floating flex-fill">
                            <input
                              type="time"
                              className="form-control"
                              value={inputs.disponibilidad_horarios[dia].inicio}
                              onChange={(e) => handleChange(e, dia, "inicio")}
                            />
                            <label>Inicio</label>
                          </div>
                          <div className="form-floating flex-fill">
                            <input
                              type="time"
                              className="form-control"
                              value={inputs.disponibilidad_horarios[dia].fin}
                              onChange={(e) => handleChange(e, dia, "fin")}
                            />
                            <label>Fin</label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Estado */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="estado"
                  id="estado"
                  checked={inputs.estado}
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-check-label" htmlFor="estado">
                  Activa
                </label>
              </div>

              {/* Alertas */}
              {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}

              {/* Botón */}
              <div className="d-grid">
                <button
                  className="btn btn-success btn-fullwidth"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creando..." : "Crear Cancha"}
                </button>
              </div>
              <div className="d-grid gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-secondary btn-fullwidth"
                  onClick={() => navigate("/dashboard")}
                >
                  Regresar al Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}