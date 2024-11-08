import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import TablaRutinas from "@components/TablaRutinas";
import ModalAgregarRutina from "@components/modals/ModalAgregarRutina";
import FotoCliente from "@assets/clienteFoto.png";
import RutinasContext from "@context/RutinasProvider";
import Alertas from "@components/Alertas";

const VisualizarCliente = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const { modal, handleModal, rutinas, setRutinas, alertaRutina, setDataModal, eliminarRutina } = useContext(RutinasContext);
  const [cliente, setCliente] = useState({
    _id: id,
    nombre: 'Ana',
    apellido: 'Gómez',
    email: 'ana@example.com',
    telefono: '+123 456 7890',
    estado: 'activo',
    genero: 'Femenino',
    edad: 30,
    estatura: 165,
    peso: 60,
    nivelActividadFisica: 'Moderado',
  });

  useEffect(() => {
    // Aquí puedes agregar la lógica para obtener los datos del cliente y sus rutinas desde el backend
    // setCliente(response.data.cliente);
    // setRutinas(response.data.rutinas);
  }, []);

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Visualizar Cliente</h1>
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
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Género:{" "}
                </span>
                {cliente.genero}
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Edad:{" "}
                </span>
                {cliente.edad} años
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Estatura:{" "}
                </span>
                {cliente.estatura} cm
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Peso:{" "}
                </span>
                {cliente.peso} kg
              </p>
              <p className="text-md text-gray-00 mt-4">
                <span className="text-gray-600 uppercase font-bold">
                  * Nivel de Actividad Física:{" "}
                </span>
                {cliente.nivelActividadFisica}
              </p>
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
                onClick={() => {
                  setDataModal({});
                  handleModal();
                }}
              >
                Agregar Rutina
              </button>
            </div>
          </div>

          {modal && <ModalAgregarRutina clienteId={cliente._id} />}

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