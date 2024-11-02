import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";

const VisualizarEjercicios = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  // Datos quemados para el ejercicio
  const ejercicio = {
    _id: id,
    nombre: 'Caminadora',
    descripcion: 'Correr 5 kilómetros.',
  };

  return (
    <div>
      <h1 className="font-black text-4xl text-gray-500">Visualizar</h1>
      {ejercicio._id ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del ejercicio:{" "}
                </span>
                {ejercicio.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Descripción:{" "}
                </span>
                {ejercicio.descripcion}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p>No se encontró el ejercicio</p>
      )}
    </div>
  );
};

export default VisualizarEjercicios;