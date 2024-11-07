import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import TablaClientes from "@components/TablaClientes";
import FotoEntrenador from "@assets/entrenadorFoto.png";

const VisualizarEntrenador = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  // Datos quemados para el entrenador y sus clientes
  const entrenador = {
    _id: id,
    nombre: 'Juan',
    apellido: 'Pérez',
    especialidad: 'Cardio',
    email: 'juan@example.com',
    telefono: '+123 456 7890',
    estado: 'activo',
    // foto: 'https://via.placeholder.com/150',
  };

  const clientes = [
    { id: 1, nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '+123 456 7890', estado: 'activo' },
    { id: 2, nombre: 'Luis Martínez', email: 'luis@example.com', telefono: '+123 456 7891', estado: 'activo' },
    { id: 3, nombre: 'Sofía Rodríguez', email: 'sofia@example.com', telefono: '+123 456 7892', estado: 'activo' },
  ];

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Entrenador</h1>
      {entrenador._id ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del Entrenador:{" "}
                </span>
                {entrenador.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Apellido del Entrenador:{" "}
                </span>
                {entrenador.apellido}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Especialidad:{" "}
                </span>
                {entrenador.especialidad}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Email:{" "}
                </span>
                {entrenador.email}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Teléfono:{" "}
                </span>
                {entrenador.telefono}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{" "}
                </span>
                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {entrenador.estado && "activo"}
                </span>
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

          {clientes.length === 0 ? (
            <p>No existen registros</p>
          ) : (
            <TablaClientes clientes={clientes} />
          )}
        </>
      ) : (
        <p>No se encontró el entrenador</p>
      )}
    </div>
  );
};

export default VisualizarEntrenador;




    // useEffect(() => {
    //     const consultarEntrenador = async () => {
    //         try {
    //             const respuesta = await axios.get(
    //                 `${import.meta.env.VITE_BACKEND_URL}/entrenador/${id}`,
    //                 {
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                     },
    //                 }
    //             );

    //             setEntrenador(respuesta.data.entrenador);
    //             setClientes(respuesta.data.clientes);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     consultarEntrenador();
    // }, [id]);