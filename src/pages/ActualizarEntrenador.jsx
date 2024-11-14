import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@context/AuthProvider";
import Alertas from "@components/Alertas";

const ActualizarEntrenador = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [entrenador, setEntrenador] = useState({
    name: "",
    lastname: "",
    email: "",
    description: "",
  });
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    const consultarEntrenador = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/coach/view-coach/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setEntrenador({
          name: response.data.user_id.name,
          lastname: response.data.user_id.lastname,
          email: response.data.user_id.email,
          description: response.data.description,
        });
      } catch (error) {
        setAlerta({
          respuesta: `No existe un entrenador con el id ${id}`,
          exito: false,
        });
      }
    };
    consultarEntrenador();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntrenador({
      ...entrenador,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/coach/update-coach/${id}`,
        entrenador,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAlerta({
        respuesta: "Entrenador actualizado correctamente",
        exito: true,
      });
      navigate(`/dashboard/entrenadores/visualizar/${id}`);
    } catch (error) {
      setAlerta({
        respuesta: "Error al actualizar el entrenador",
        exito: false,
      });
    }
  };

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Actualizar Entrenador</h1>
      <p className="mb-8 my-4">Edita los campos necesarios y guarda los cambios.</p>
      {alerta.respuesta && (
        <Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border-2 w-full p-2 rounded-md"
            value={entrenador.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Apellido
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            className="border-2 w-full p-2 rounded-md"
            value={entrenador.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border-2 w-full p-2 rounded-md"
            value={entrenador.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="border-2 w-full p-2 rounded-md"
            value={entrenador.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0D9488] text-white px-4 py-2 rounded-md hover:bg-[#0B7A6A]"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActualizarEntrenador;