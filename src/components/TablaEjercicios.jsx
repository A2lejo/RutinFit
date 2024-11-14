import React from 'react';
import { MdInfo, MdEdit, MdDeleteForever } from 'react-icons/md';

const TablaEjercicios = ({ ejercicios, handleDelete, handleEdit, handleView, auth }) => {
  return (
    <table className="w-full mt-5 table-auto shadow-lg bg-white">
      <thead className="bg-gray-800 text-slate-400">
        <tr>
          <th className="p-2">N°</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Repeticiones</th>
          <th className="p-2">Series</th>
          <th className="p-2">Descripción</th>
          <th className="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ejercicios.map((ejercicio, index) => (
          <tr className="border-b hover:bg-gray-300 text-center" key={ejercicio.id}>
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{ejercicio.nombre}</td>
            <td className="p-2">{ejercicio.repeticiones}</td>
            <td className="p-2">{ejercicio.series}</td>
            <td className="p-2">{ejercicio.descripcion}</td>
            <td className="p-2 text-center">
              <MdInfo
                className="h-7 w-7 text-slate-900 cursor-pointer inline-block mr-2"
                onClick={() => handleView(ejercicio)}
              />

              {(auth.rol === 'entrenador') && (
                <>
                  <MdEdit
                    className="h-7 w-7 text-blue-800 cursor-pointer inline-block mr-2"
                    onClick={() => handleEdit(ejercicio)}
                  />
                  <MdDeleteForever
                    className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                    onClick={() => handleDelete(ejercicio.id)}
                  />
                </>
              )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaEjercicios;