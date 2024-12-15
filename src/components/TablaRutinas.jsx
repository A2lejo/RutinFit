import React, { useContext } from "react";
import { MdDeleteForever, MdEdit, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RutinasContext from "@context/RutinasProvider";

const TablaRutinas = ({ rutinas }) => {
  const { eliminarRutina, handleModal, setDataModal } = useContext(RutinasContext);
  const navigate = useNavigate();

  console.log("info de rutinas: ", rutinas);

  return (
    <div className="bg-white shadow-custom rounded-lg p-6">
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Nombre de la Rutina</th>
            <th className="p-2 hidden md:table-cell">Fecha de Inicio</th>
            <th className="p-2 hidden md:table-cell">Fecha de Fin</th>
            <th className="p-2 hidden md:table-cell">Completada</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutinas.map((rutina, index) => (
            <tr className="border-b hover:bg-gray-300 text-center" key={rutina?._id || index}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{rutina?.nameRoutine || 'Nombre no disponible'}</td>
              <td className="p-2 hidden md:table-cell">{rutina?.start_date ? new Date(rutina.start_date).toLocaleDateString() : 'Fecha no disponible'}</td>
              <td className="p-2 hidden md:table-cell">{rutina?.end_date ? new Date(rutina.end_date).toLocaleDateString() : 'Fecha no disponible'}</td>
              <td className="p-2 hidden md:table-cell">{rutina?.completed ? "Sí" : "No"}</td>
              <td className="p-2 text-center">
                <MdInfo
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => navigate(`/dashboard/rutinas/${rutina?._id}`)}
                />
                <MdEdit
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => {
                    console.log("rutina a editar: ", rutina); // Verificar el objeto rutina completo
                    setDataModal(rutina); 
                    handleModal(); 
                  }}
                />
                <MdDeleteForever
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                  onClick={() => eliminarRutina(rutina?._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRutinas;