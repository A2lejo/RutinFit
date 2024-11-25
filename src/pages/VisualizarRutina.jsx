import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import RutinasContext from "@context/RutinasProvider";
import Alertas from "@components/Alertas";
import { MdInfo } from "react-icons/md";

const VisualizarRutina = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { obtenerRutinaPorId } = useContext(RutinasContext);
  const [rutina, setRutina] = useState(null);

  useEffect(() => {
    const fetchRutina = async () => {
      try {
        const rutinaObtenida = await obtenerRutinaPorId(id);
        setRutina(rutinaObtenida);
      } catch (error) {
        console.error('Error al obtener la rutina:', error);
      }
    };

    fetchRutina();
  }, [id, obtenerRutinaPorId]);

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Rutina</h1>
      {rutina ? (
        <>
          <div className="m-5">
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Nombre de la Rutina:{" "}
              </span>
              {rutina.nameRoutine}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Fecha de Asignación:{" "}
              </span>
              {new Date(rutina.assignment_date).toLocaleDateString()}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Fecha de Inicio:{" "}
              </span>
              {new Date(rutina.start_date).toLocaleDateString()}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Fecha de Fin:{" "}
              </span>
              {new Date(rutina.end_date).toLocaleDateString()}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Comentarios:{" "}
              </span>
              {rutina.comments}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Completada:{" "}
              </span>
              {rutina.completed ? "Sí" : "No"}
            </p>
          </div>
          <hr className="my-4" />
          <div className="m-5">
            <p>Días de la rutina:{" "}</p>
            {rutina.days.length === 0 ? (
              <Alertas exito={false}>No hay días agregados aún.</Alertas>
            ) : (
              rutina.days.map((dayObj, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-bold mb-2">{dayObj.day.charAt(0).toUpperCase() + dayObj.day.slice(1)}</h3>
                  {dayObj.exercises.length === 0 ? (
                    <Alertas exito={false}>No hay ejercicios agregados para este día.</Alertas>
                  ) : (
                    <ul>
                      {dayObj.exercises.map((exercise) => (
                        <li key={exercise._id} className="ml-4 list-disc flex items-center">
                          {exercise.name}
                          <MdInfo
                            className="h-5 w-5 text-slate-800 cursor-pointer ml-2"
                            onClick={() => {
                              console.log('Navigating to exercise ID:', exercise._id); // Verificar el ID del ejercicio
                              navigate(`/dashboard/ejercicios/${exercise._id}`);
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p>No se encontró la rutina</p>
      )}
    </div>
  );
};

export default VisualizarRutina;