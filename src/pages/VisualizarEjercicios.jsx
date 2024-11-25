import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RutinasContext from "@context/RutinasProvider";

const VisualizarEjercicios = () => {
  const { id } = useParams();
  const { obtenerEjercicioPorId } = useContext(RutinasContext);
  const [ejercicio, setEjercicio] = useState(null);

  useEffect(() => {
    console.log('ID del ejercicio:', id); // Verificar el ID del ejercicio
    const fetchEjercicio = async () => {
      try {
        const ejercicioObtenido = await obtenerEjercicioPorId(id);
        setEjercicio(ejercicioObtenido);
      } catch (error) {
        console.error('Error al obtener el ejercicio:', error);
      }
    };

    fetchEjercicio();
  }, [id, obtenerEjercicioPorId]);

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Ejercicio</h1>
      {ejercicio ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del ejercicio:{" "}
                </span>
                {ejercicio.name}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Descripción:{" "}
                </span>
                {ejercicio.description}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Categoría:{" "}
                </span>
                {ejercicio.category}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Equipamiento:{" "}
                </span>
                {ejercicio.equipment}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nivel:{" "}
                </span>
                {ejercicio.level}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Instrucciones:{" "}
                </span>
                <ul>
                  {ejercicio.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </p>
              {/* <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Imagenes:{" "}
                </span>
                <div>
                  {ejercicio.images.map((image, index) => (
                    <img key={index} src={image} alt={`Ejercicio ${index}`} className="w-32 h-32" />
                  ))}
                </div>
              </p> */}
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