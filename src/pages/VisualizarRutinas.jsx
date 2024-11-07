import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import TablaEjercicios from "@components/TablaEjercicios";

const VisualizarRutina = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  // Datos quemados para la rutina y sus ejercicios
  const rutina = {
    _id: id,
    nombre: 'Rutina Cardio',
    descripcion: 'Ejercicios de cardio para mejorar la resistencia.',
  };

  const ejercicios = [
    { id: 1, nombre: 'Caminadora', descripcion: 'Correr 5 kilómetros.' },

  ];

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Rutina</h1>
      {rutina._id ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre de la Rutina:{" "}
                </span>
                {rutina.nombre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Descripción:{" "}
                </span>
                {rutina.descripcion}
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center pb-5">
            <p>Ejercicios de la rutina del cliente:{" "}</p>
          </div>

          {ejercicios.length === 0 ? (
            <p>No existen registros</p>
          ) : (
            <TablaEjercicios ejercicios={ejercicios} />
          )}
        </>
      ) : (
        <p>No se encontró la rutina</p>
      )}
    </div>
  );
};

export default VisualizarRutina;