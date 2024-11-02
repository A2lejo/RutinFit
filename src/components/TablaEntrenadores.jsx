import React from 'react';
import { MdInfo, MdNoteAdd, MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TablaEntrenadores = ({ entrenadores, handleDelete, auth }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-custom rounded-lg p-6">
      <table className="w-full mt-5 table-auto shadow-lg bg-white">
        <thead className="bg-gray-800 text-slate-400">
          <tr>
            <th className="p-2">N°</th>
            <th className="p-2">Nombre</th>
            <th className="p-2 hidden md:table-cell">Especialidad</th>
            <th className="p-2 hidden md:table-cell">Email</th>
            <th className="p-2 hidden md:table-cell">Teléfono</th>
            <th className="p-2 hidden md:table-cell">Estado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {entrenadores.map((entrenador, index) => (
            <tr className="border-b hover:bg-gray-300 text-center" key={entrenador.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{entrenador.nombre}</td>
              <td className="p-2 hidden md:table-cell">{entrenador.especialidad}</td>
              <td className="p-2 hidden md:table-cell">{entrenador.email}</td>
              <td className="p-2 hidden md:table-cell">{entrenador.telefono}</td>
              <td className="p-2 hidden md:table-cell">
                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  {entrenador.estado}
                </span>
              </td>
              <td className="p-2 text-center">
                <MdInfo
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => navigate(`/dashboard/entrenadores/${entrenador.id}`)}
                />
                {auth.rol === 'admin' && (
                  <>
                    <MdNoteAdd
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => navigate(`/dashboard/entrenadores/editar/${entrenador.id}`)}
                    />
                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => handleDelete(entrenador.id)}
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

export default TablaEntrenadores;