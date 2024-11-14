import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import TablaEjercicios from "@components/TablaEjercicios";
import ModalAgregarEjercicio from "@components/modals/ModalAgregarEjercicio";
import RutinasContext from "@context/RutinasProvider";
import Alertas from "@components/Alertas";

const VisualizarRutina = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const { modal, handleModal, rutinas, setRutinas, alertaRutina, setDataModal, eliminarEjercicio } = useContext(RutinasContext);
  const [rutina, setRutina] = useState({
    id: 1,
    nombre: "Rutina de Ejemplo",
    descripcion: "Esta es una rutina de ejemplo con datos quemados.",
    ejercicios: [
      { id: 1, nombre: "Sentadillas", repeticiones: 15, series: 3, descripcion: "Hacer 15 sentadillas en 3 series." },
      { id: 2, nombre: "Flexiones", repeticiones: 20, series: 3, descripcion: "Hacer 20 flexiones en 3 series." },
      { id: 3, nombre: "Abdominales", repeticiones: 25, series: 3, descripcion: "Hacer 25 abdominales en 3 series." },
    ],
  });

  useEffect(() => {
    const rutinaEncontrada = rutinas.find((r) => r.id === parseInt(id));
    if (rutinaEncontrada) {
      setRutina({ ...rutinaEncontrada, ejercicios: rutinaEncontrada.ejercicios || [] });
    }
  }, [id, rutinas]);

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
              {rutina.nombre}
            </p>
            <p className="text-md text-gray-00 mt-4">
              <span className="text-gray-600 uppercase font-bold">
                * Descripción:{" "}
              </span>
              {rutina.descripcion}
            </p>
          </div>
          <hr className="my-4" />
          <div className="m-5 flex justify-between">
            <div>
              <p>Ejercicios de la rutina:{" "}</p>
            </div>
            <div>
              <button
                className="bg-[#82E5B5] hover:bg-[#0D9488] hover:text-white px-4 py-2 rounded-md"
                onClick={() => {
                  setDataModal({});
                  handleModal();
                }}
              >
                Agregar Ejercicio
              </button>
            </div>
          </div>

          {modal && <ModalAgregarEjercicio rutinaId={rutina.id} />}

          {rutina.ejercicios.length === 0 ? (
            <Alertas exito={false}>No hay ejercicios agregados aún.</Alertas>
          ) : (
            <>
              {alertaRutina.respuesta && (
                <Alertas exito={alertaRutina.exito}>{alertaRutina.respuesta}</Alertas>
              )}
              <TablaEjercicios
                ejercicios={rutina.ejercicios}
                handleDelete={(ejercicioId) => {
                  eliminarEjercicio(rutina.id, ejercicioId);
                }}
                handleEdit={(ejercicio) => {
                  setDataModal(ejercicio);
                  handleModal();
                }}
                auth={auth}
              />
            </>
          )}
        </>
      ) : (
        <p>No se encontró la rutina</p>
      )}
    </div>
  );
};

export default VisualizarRutina;