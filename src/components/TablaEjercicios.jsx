import React from "react";
import { MdDeleteForever, MdNoteAdd } from "react-icons/md";

const TablaEjercicios = ({ ejercicios = [], handleDelete, handleEdit, auth }) => {
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
          {ejercicios.map((ejercicio, index) => (
            <tr className="border-b hover:bg-gray-300 text-center" key={ejercicio.id}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{ejercicio.nombre}</td>
              <td className="p-2 hidden md:table-cell">{ejercicio.descripcion}</td>
              <td className="p-2 text-center">
                <MdNoteAdd
                  className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                  onClick={() => handleEdit(ejercicio)}
                />
                <MdDeleteForever
                  className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                  onClick={() => handleDelete(ejercicio.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEjercicios;