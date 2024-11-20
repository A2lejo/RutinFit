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
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/coach/get-clients`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('respuesta:', respuesta.data); 
      setClientes(respuesta.data); 
    } catch (error) {
      console.error('Error al listar clientes:', error);
    }
  };

  useEffect(() => {
    listarClientes();
  }, []);

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
      listarClientes(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const filteredClientes = clientes.filter((cliente) =>
    `${cliente.user_id.name} ${cliente.user_id.lastname}`.toLowerCase().includes(search.toLowerCase())
  );

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
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente, index) => (
              <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{`${cliente.user_id.name} ${cliente.user_id.lastname}`}</td>
                <td className="p-2 hidden md:table-cell">{cliente.user_id.email}</td>
                <td className="p-2 hidden md:table-cell">{cliente.height} cm</td>
                <td className="p-2 hidden md:table-cell">{cliente.weight} kg</td>
                <td className="p-2 hidden md:table-cell">
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {cliente.status ? 'activo' : 'inactivo'}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <MdInfo
                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                    onClick={() => navigate(`/dashboard/clientes/visualizar/${cliente._id}`)}
                  />
                  {auth.rol === 'entrenador' && (
                    <MdDeleteForever
                      className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                      onClick={() => handleDelete(cliente._id)}
                    />
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

export default TablaClientes;