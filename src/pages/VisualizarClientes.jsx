import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import TablaRutinas from "@components/TablaRutinas";

const VisualizarCliente = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  // Datos quemados para el cliente y sus rutinas
  const cliente = {
    _id: id,
    nombre: 'Ana',
    apellido: 'Gómez',
    email: 'ana@example.com',
    telefono: '+123 456 7890',
    estado: 'activo',
    foto: 'https://via.placeholder.com/150',
  };

  const rutinas = [
    { id: 1, nombre: 'Rutina Cardio', descripcion: 'Ejercicios de cardio para mejorar la resistencia.' },
    { id: 2, nombre: 'Rutina Fuerza', descripcion: 'Ejercicios de fuerza para aumentar la musculatura.' },
    { id: 3, nombre: 'Rutina Flexibilidad', descripcion: 'Ejercicios de flexibilidad para mejorar el rango de movimiento.' },
  ];

  return (
    <div>
      <h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
      {cliente._id ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del Cliente:{" "}
                </span>
                {cliente.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Apellido del Cliente:{" "}
                </span>
                {cliente.apellido}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Email:{" "}
                </span>
                {cliente.email}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Teléfono:{" "}
                </span>
                {cliente.telefono}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{" "}
                </span>
                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {cliente.estado && "activo"}
                </span>
              </p>
            </div>
            <div>
              <img
                src={cliente.foto}
                alt="foto"
                className="w-40 h-40"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center pb-5">
            <p>Rutinas del cliente:{" "}</p>
          </div>

          {rutinas.length === 0 ? (
            <p>No existen registros</p>
          ) : (
            <TablaRutinas rutinas={rutinas} />
          )}
        </>
      ) : (
        <p>No se encontró el cliente</p>
      )}
    </div>
  );
};

export default VisualizarCliente;