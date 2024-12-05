import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "@context/AuthProvider";
import TablaRutinas from "@components/TablaRutinas";
import ModalAgregarRutina from "@components/modals/ModalAgregarRutina";
import ModalHistorialProgresos from "@components/modals/Progresos";
import FotoCliente from "@assets/clienteFoto.png";
import RutinasContext from "@context/RutinasProvider";
import Alertas from "@components/Alertas";

const VisualizarCliente = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const { modal, handleModal, alertaRutina = {}, setDataModal, eliminarRutina, rutinas, setRutinas } = useContext(RutinasContext);
  const [cliente, setCliente] = useState(null);
  const [modalHistorial, setModalHistorial] = useState(false);
  const [mensajeRutina, setMensajeRutina] = useState('');

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No se encontró el token de autenticación');
        }

        const respuesta = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/coach/get-client/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('respuesta:', respuesta.data);
        setCliente(respuesta.data.client);

        // Obtener las rutinas del cliente
        const rutinasRespuesta = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/routine/view-routines/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('rutinas:', rutinasRespuesta.data.routines);
        setRutinas(rutinasRespuesta.data.routines || []); // Asegurarse de que 'routines' sea un array
      } catch (error) {
        setMensajeRutina('EL cliente aun no tiene rutinas asignadas');
      }
    };

    obtenerCliente();
  }, [id]);

  const handleOpenHistorial = () => {
    setModalHistorial(true);
  };

  const handleCloseHistorial = () => {
    setModalHistorial(false);
  };

  const handleOpenAgregarRutina = () => {
    setDataModal(null); // Asegurarse de que dataModal esté vacío
    handleModal();
  };

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Cliente</h1>
      {cliente ? (
        <>
          <div className="m-5 flex justify-between">
            <div>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nombre del Cliente:{" "}
                </span>
                {cliente.user_id.name}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Apellido del Cliente:{" "}
                </span>
                {cliente.user_id.lastname}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Email:{" "}
                </span>
                {cliente.user_id.email}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Género:{" "}
                </span>
                {cliente.genre}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Dias:{" "}
                </span>
                {cliente.days.join(', ')}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Edad:{" "}
                </span>
                {cliente.age} años
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estatura:{" "}
                </span>
                {cliente.height} cm
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Peso:{" "}
                </span>
                {cliente.weight} kg
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nivel de Actividad Física:{" "}
                </span>
                {cliente.levelactivity}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estado:{" "}
                </span>
                <span className={`bg-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${cliente.user_id.status ? 'text-green-500 dark:bg-blue-900 dark:text-blue-300' : 'text-red-500 dark:bg-red-900 dark:text-red-300'}`}>
                  {cliente.user_id.status ? "activo" : "inactivo"}
                </span>
              </p>
              <button
                className="bg-[#82E5B5] hover:bg-[#0D9488] hover:text-white px-4 py-2 rounded-md mt-4"
                onClick={handleOpenHistorial}
              >
                Ver Historial de Progresos
              </button>
            </div>
            <div>
              <img
                src={FotoCliente}
                alt="foto"
                className="w-40 h-40 mr-8"
              />
            </div>
          </div>
          <hr className="my-4" />
          <div className="m-5 flex justify-between">
            <div>
              <p>Rutinas del cliente:{" "}</p>
            </div>
            <div>
              <button
                className="bg-[#82E5B5] hover:bg-[#0D9488] hover:text-white px-4 py-2 rounded-md"
                onClick={handleOpenAgregarRutina}
              >
                Agregar Rutina
              </button>
            </div>
          </div>

          {modal && <ModalAgregarRutina clienteId={cliente._id} coachId={cliente.coach_id} days={cliente.days} />}

          {modalHistorial && (
            <ModalHistorialProgresos
              clienteId={cliente._id}
              handleClose={handleCloseHistorial}
            />
          )}

          {rutinas.length === 0 ? (
            <p>No existen registros</p>
          ) : (
            <>
              {alertaRutina.respuesta && (
                <Alertas exito={alertaRutina.exito}>{alertaRutina.respuesta}</Alertas>
              )}
              <TablaRutinas
                rutinas={rutinas}
                handleDelete={eliminarRutina}
                handleEdit={(rutina) => {
                  setDataModal(rutina);
                  handleModal();
                }}
                auth={auth}
              />
            </>
          )}
        </>
      ) : (
        <p>No se encontró el cliente</p>
      )}
    </div>
  );
};

export default VisualizarCliente;