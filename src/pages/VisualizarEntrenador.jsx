import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@context/AuthProvider";
import FotoEntrenador from "@assets/entrenadorFoto.png";

const VisualizarEntrenador = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [entrenador, setEntrenador] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const consultarEntrenador = async () => {
      try {
        const respuesta = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/coach/view-coach/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (respuesta.data) {
          setEntrenador(respuesta.data);
        } else {
          console.error("No se encontró el entrenador");
        }
      } catch (error) {
        console.error("Error al consultar el entrenador:", error);
      }
    };

    const obtenerClientes = async () => {
      try {
        const respuesta = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/coach/get-clients/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (respuesta.data) {
          setClientes(respuesta.data.clients);
        } else {
          console.error("No se encontraron clientes");
        }
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };

    consultarEntrenador();
    obtenerClientes();
  }, [id]);

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Entrenador</h1>
      {entrenador ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del Entrenador:{" "}
                </span>
                {entrenador.user_id.name}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Apellido del Entrenador:{" "}
                </span>
                {entrenador.user_id.lastname}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Descripción:{" "}
                </span>
                {entrenador.description}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Email:{" "}
                </span>
                {entrenador.user_id.email}
              </p>
            </div>
            <div>
              <img
                src={FotoEntrenador}
                alt="foto"
                className="w-40 h-40 mr-8"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center pb-5">
            <p>Clientes a cargo del entrenador:{" "}</p>
          </div>
          <div>
            {clientes.length > 0 ? (
              <table className="w-full mt-5 table-auto shadow-lg bg-white">
                <thead className="bg-gray-800 text-slate-400">
                  <tr>
                    <th className="p-2">N°</th>
                    <th className="p-2">Nombre Completo</th>
                    <th className="p-2 hidden md:table-cell">Email</th>
                    <th className="p-2 hidden md:table-cell">Altura</th>
                    <th className="p-2 hidden md:table-cell">Peso</th>
                    <th className="p-2 hidden md:table-cell">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente, index) => (
                    <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{`${cliente.user_id.name} ${cliente.user_id.lastname}`}</td>
                      <td className="p-2 hidden md:table-cell">{cliente.user_id.email}</td>
                      <td className="p-2 hidden md:table-cell">{cliente.height} cm</td>
                      <td className="p-2 hidden md:table-cell">{cliente.weight} kg</td>
                      <td className="p-2 hidden md:table-cell">
                        <span className={`bg-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${cliente.user_id.status ? 'text-green-500 dark:bg-blue-900 dark:text-blue-300' : 'text-red-500 dark:bg-red-900 dark:text-red-300'}`}>
                          {cliente.user_id.status ? 'activo' : 'inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay clientes asignados a este entrenador.</p>
            )}
          </div>
        </>
      ) : (
        <p>No se encontró el entrenador</p>
      )}
    </div>
  );
};

export default VisualizarEntrenador;