import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function FormEditCancha() {
  const { id } = useParams(); // ID de la cancha a editar
  const navigate = useNavigate();
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

  const diasSemana = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];

  // Cargar datos existentes
  useEffect(() => {
    const fetchCancha = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `https://reservas-cancha-1.onrender.com/api/v1/cancha/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInputs(response.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos de la cancha.");
      }
    };
    fetchCancha();
  }, [id]);

  const handleChange = (e, dia, campo) => {
    const { type, checked, value } = e.target;
    if (dia && campo) {
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
      await axios.put(
        `https://reservas-cancha-1.onrender.com/api/v1/cancha/${id}`,
        inputs,
        { headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage("¡Cancha actualizada exitosamente!");
      navigate("/canchas");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Error al actualizar la cancha");
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
        .card-custom {
          width: 100%;
          max-width: 700px;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          background-color: white;
        }
        .form-floating > input {
          height: 3rem;
        }
        .d-grid > button {
          min-height: 3rem;
        }
      `}</style>

      <div className="full-screen-form-container">
        <div className="card card-custom">
          <div className="card-body">
            <h3 className="fw-bold text-center mb-4">Editar Cancha</h3>
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
              {/* Tipo */}
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
              {/* Disponibilidad */}
              <div className="mb-3">
                <label className="form-label fw-bold">Disponibilidad de horarios</label>
                <div className="d-flex flex-column gap-2">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="border rounded p-2">
                      <div className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={dia}
                          checked={inputs.disponibilidad_horarios[dia]?.disponible}
                          onChange={(e) => handleChange(e, dia, "disponible")}
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor={dia}
                        >
                          {dia.charAt(0).toUpperCase() + dia.slice(1)}
                        </label>
                      </div>
                      {inputs.disponibilidad_horarios[dia]?.disponible && (
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
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {/* Botones */}
              <div className="d-grid">
                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                  {isLoading ? "Actualizando..." : "Actualizar Cancha"}
                </button>
              </div>
              <div className="d-grid gap-2 mt-2">
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/canchas")}>
                  Regresar a Canchas
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}