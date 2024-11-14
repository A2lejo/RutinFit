import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "@context/AuthProvider";
import TablaClientes from "@components/TablaClientes";
import FotoEntrenador from "@assets/entrenadorFoto.png";

const VisualizarEntrenador = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [entrenador, setEntrenador] = useState(null);

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

    consultarEntrenador();
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

          <TablaClientes clientes={entrenador.clientes} />
        </>
      ) : (
        <p>No se encontró el entrenador</p>
      )}
    </div>
  );
};

export default VisualizarEntrenador;