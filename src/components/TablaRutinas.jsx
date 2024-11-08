import React, { useContext } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RutinasContext from "@context/RutinasProvider";
import { AuthContext } from "@context/AuthProvider";

const TablaRutinas = ({ rutinas }) => {
  const { eliminarRutina, handleModal, setDataModal } = useContext(RutinasContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-custom rounded-lg p-6">
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Nombre</th>
            <th className="p-2 hidden md:table-cell">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutinas.map((rutina, index) => (
            <tr className="border-b hover:bg-gray-300 text-center" key={rutina.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{rutina.nombre}</td>
              <td className="p-2 hidden md:table-cell">{rutina.descripcion}</td>
              <td className="p-2 text-center">
                <MdInfo
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => navigate(`/dashboard/rutinas/${rutina.id}`)}
                />
                <MdNoteAdd
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => {
                    setDataModal(rutina);
                    handleModal();
                  }}
                />
                <MdDeleteForever
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                  onClick={() => eliminarRutina(rutina.id)}
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