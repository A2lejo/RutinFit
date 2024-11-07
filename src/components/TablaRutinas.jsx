import React from 'react';
import { MdInfo, MdNoteAdd, MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TablaRutinas = ({ rutinas, handleDelete, auth ={} }) => {
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
                  onClick={() => navigate(`/dashboard/rutinas/visualizar/${rutina.id}`)}
                />
                {auth.rol === 'entrenador' || auth.rol === 'admin' && (
                  <>
                    <MdNoteAdd
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => navigate(`/dashboard/rutinas/editar/${rutina.id}`)}
                    />
                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => handleDelete(rutina.id)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRutinas;