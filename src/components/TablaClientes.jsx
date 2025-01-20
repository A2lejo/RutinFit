import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@context/AuthProvider';
import Alertas from '@components/Alertas';
import { confirmDeleteAlert, successAlert } from '../utils/AlertFunctions';
import { MdInfo, MdDeleteForever } from 'react-icons/md';

const TablaClientes = ({ search }) => {
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const listarClientes = async () => {
    try {
      let ruta;
      if (auth.rol === 'administrador') {
        ruta = '/client/view-all';
      } else {
        ruta = '/coach/get-clients';
      }


      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}${ruta}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setClientes(respuesta.data.clients || respuesta.data || []);
    } catch (error) {
      console.error('Error al listar clientes:', error);
    }
  };

  useEffect(() => {
    if (auth && auth.id) {
      listarClientes();
    } else {
      console.log('Usuario no autenticado');
    }
  }, [auth]);

  const handleDelete = async (id) => {
    const confirmDelete = await confirmDeleteAlert();
    if (!confirmDelete) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/client/delete/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      successAlert('El cliente ha sido eliminado.');
      listarClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const filteredClientes = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.user_id?.name ?? ''} ${cliente.user_id?.lastname ?? ''}`.toLowerCase();
    return nombreCompleto.includes(search.toLowerCase());
  });

  return (
    <>
      {filteredClientes.length === 0 ? (
        <Alertas exito={true}>No existen registros</Alertas>
      ) : (
        <table className="w-full mt-5 table-auto shadow-lg bg-white">
          <thead className="bg-gray-800 text-slate-400">
            <tr>
              <th className="p-2">N°</th>
              <th className="p-2">Nombre Completo</th>
              <th className="p-2 hidden md:table-cell">Email</th>
              <th className="p-2 hidden md:table-cell">Altura</th>
              <th className="p-2 hidden md:table-cell">Peso</th>
              <th className="p-2 hidden md:table-cell">Estado</th>
              {auth.rol === 'entrenador' && (
                <th className="p-2">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente, index) => (
              <tr className="border-b hover:bg-gray-300 text-center" key={cliente.client_id || cliente._id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {cliente.user_id?.name} {cliente.user_id?.lastname}
                </td>
                <td className="p-2 hidden md:table-cell">
                  {cliente.user_id?.email}
                </td>
                <td className="p-2 hidden md:table-cell">{cliente.height} cm</td>
                <td className="p-2 hidden md:table-cell">{cliente.weight} kg</td>
                <td className="p-2 hidden md:table-cell">
                  <span className={`bg-blue-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ${(cliente.user_id?.status ? 'text-green-500 dark:bg-blue-900 dark:text-blue-300' : 'text-red-500 dark:bg-red-900 dark:text-red-300')}`}>
                    {cliente.user_id?.status ? 'activo' : 'inactivo'}
                  </span>
                </td>
                {auth.rol === 'entrenador' && (
                  <td className="p-2 text-center">
                    <MdInfo
                      className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                      onClick={() => navigate(`/dashboard/clientes/visualizar/${cliente.client_id || cliente._id}`)}
                    />
                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => handleDelete(cliente.client_id || cliente._id)}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TablaClientes;