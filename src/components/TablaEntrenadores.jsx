import React, { useEffect, useState, useContext } from 'react';
import { MdInfo, MdEdit, MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alertas from '@components/Alertas';
import { AuthContext } from '@context/AuthProvider';
import { confirmDeleteAlert, successAlert, errorAlert } from '../utils/AlertFunctions.js';

const TablaEntrenadores = ({ search }) => {
  const [entrenadores, setEntrenadores] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const listarEntrenadores = async () => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/coach/view-coaches`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('respuesta:', respuesta.data);
      setEntrenadores(respuesta.data);
    } catch (error) {
      console.error('Error al listar entrenadores:', error);
    }
  };

  useEffect(() => {
    listarEntrenadores();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = await confirmDeleteAlert();
      if (confirmDelete) {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/coach/delete-coach/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        listarEntrenadores();
        successAlert('El entrenador ha sido eliminado.');
      }
    } catch (error) {
      console.error('Error al eliminar entrenador:', error);
      errorAlert('Hubo un problema al eliminar el entrenador.');
    }
  };

  const filteredEntrenadores = entrenadores.filter((entrenador) =>
    `${entrenador.user_id.name} ${entrenador.user_id.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {filteredEntrenadores.length === 0 ? (
        <Alertas exito={true}>No existen registros</Alertas>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre Completo</th>
              <th className="p-2 hidden md:table-cell">Email</th>
              <th className="p-2 hidden md:table-cell">Descripción</th>
              <th className="p-2 hidden md:table-cell">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntrenadores.map((entrenador, index) => (
              <tr className="border-b hover:bg-gray-300 text-center" key={entrenador._id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{`${entrenador.user_id.name} ${entrenador.user_id.lastname}`}</td>
                <td className="p-2 hidden md:table-cell">{entrenador.user_id.email}</td>
                <td className="p-2 hidden md:table-cell">{entrenador.description}</td>
                <td className="p-2 hidden md:table-cell">
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {entrenador.user_id.status ? 'activo' : 'inactivo'}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <MdInfo
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() => navigate(`/dashboard/entrenadores/visualizar/${entrenador._id}`)}
                  />
                  {auth.rol === 'administrador' && (
                    <>
                      <MdEdit
                        className="h-7 w-7 text-blue-700 cursor-pointer inline-block mr-2"
                        onClick={() => navigate(`/dashboard/entrenadores/editar/${entrenador._id}`)}
                      />
                      <MdDeleteForever
                        className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                        onClick={() => handleDelete(entrenador._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TablaEntrenadores;