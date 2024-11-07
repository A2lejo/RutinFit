import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alertas from "@components/Alertas";
import { AuthContext } from "@context/AuthProvider";

export const FormularioEntrenadores = ({ entrenador }) => {
  const navigate = useNavigate();

  const [alerta, setAlerta] = useState({});
  const { auth } = useContext(AuthContext);

  const [form, setForm] = useState({
    nombre: entrenador?.nombre ?? "",
    apellido: entrenador?.apellido ?? "",
    especialidad: entrenador?.especialidad ?? "",
    email: entrenador?.email ?? "",
    telefono: entrenador?.telefono ?? "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (entrenador?._id) {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/entrenador/${entrenador?._id}`,
        form,
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      navigate("/dashboard/entrenadores");
    } else {
      try {
        form.id = auth._id;
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/entrenadores/registro`,
          form,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAlerta({
          respuesta: "Entrenador registrado con éxito",
          exito: true,
        });
        setTimeout(() => {
          navigate("/dashboard/entrenadores");
        }, 5000);
      } catch (error) {
        setAlerta({ respuesta: error.response.data.res, exito: false });
        setTimeout(() => {
          setAlerta({});
        }, 3000);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre del entrenador"
          name="nombre"
          onChange={handleChange}
          value={form.nombre}
        />
      </div>
      <div>
        <label
          htmlFor="apellido"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Apellido:
        </label>
        <input
          id="apellido"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Apellido del entrenador"
          name="apellido"
          onChange={handleChange}
          value={form.apellido}
        />
      </div>
      <div>
        <label
          htmlFor="especialidad"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Especialidad:
        </label>
        <input
          id="especialidad"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Especialidad del entrenador"
          name="especialidad"
          onChange={handleChange}
          value={form.especialidad}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email:
        </label>
        <input
          id="email"
          type="email"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Email del entrenador"
          name="email"
          onChange={handleChange}
          value={form.email}
        />
      </div>
      <div>
        <label
          htmlFor="telefono"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Teléfono:
        </label>
        <input
          id="telefono"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Teléfono del entrenador"
          name="telefono"
          onChange={handleChange}
          value={form.telefono}
        />
      </div>
      {alerta.respuesta && (
        <Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
      )}
      <input
        type="submit"
        className="bg-[#0D9488] w-full p-3 
                    text-black uppercase font-bold rounded-lg 
                    hover:bg-gray-900 hover:text-slate-300 cursor-pointer transition-all"
        value={
          entrenador?._id ? "Actualizar entrenador" : "Registrar entrenador"
        }
      />
    </form>
  );
};