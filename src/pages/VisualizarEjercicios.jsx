import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import RutinasContext from "@context/RutinasProvider";

const VisualizarEjercicios = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { obtenerEjercicioPorId } = useContext(RutinasContext);
  const [ejercicio, setEjercicio] = useState(null);

  useEffect(() => {
    console.log('ID del ejercicio:', id); 
    const fetchEjercicio = async () => {
      try {
        const ejercicioObtenido = await obtenerEjercicioPorId(id);
        console.log('Ejercicio obtenido:', ejercicioObtenido);
        setEjercicio(ejercicioObtenido);
      } catch (error) {
        console.error('Error al obtener el ejercicio:', error);
      }
    };

    fetchEjercicio();
  }, [id, obtenerEjercicioPorId]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Ejercicio</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Regresar
        </button>
      </div>
      {ejercicio ? (
        <>
          <div className="m-5 flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del ejercicio:{" "}
                </span>
                {ejercicio.name}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Parte del cuerpo:{" "}
                </span>
                {ejercicio.bodyPart}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Musculo:{" "}
                </span>
                {ejercicio.target}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Musculo Secundario:{" "}
                </span>
                {ejercicio.secondaryMuscles.join(", ")}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Equipamiento:{" "}
                </span>
                {ejercicio.equipment}
              </p>
              <div className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Instrucciones:{" "}
                </span>
                <ul>
                  {ejercicio.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>
              <div className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Ejemplo:{" "}
                </span>
                <img src={ejercicio.gifUrl} alt={`Ejercicio ${ejercicio.name}`} className="w-32 h-32" />
              </div>
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