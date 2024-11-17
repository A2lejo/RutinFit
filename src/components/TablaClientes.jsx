import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '@context/AuthProvider';
import Alertas from '@components/Alertas';

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
      setClientes(respuesta.data.clientes || []); // Asegurarse de que clientes sea un array
    } catch (error) {
      console.error('Error al listar clientes:', error);
    }
  };

  useEffect(() => {
    listarClientes();
  }, []);

  const filteredClientes = clientes.filter((cliente) =>
    `${cliente.name} ${cliente.lastname}`.toLowerCase().includes(search.toLowerCase())
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
              <th className="p-2 hidden md:table-cell">Teléfono</th>
              <th className="p-2 hidden md:table-cell">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente, index) => (
              <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{`${cliente.name} ${cliente.lastname}`}</td>
                <td className="p-2 hidden md:table-cell">{cliente.email}</td>
                <td className="p-2 hidden md:table-cell">{cliente.telefono}</td>
                <td className="p-2 hidden md:table-cell">
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {cliente.status ? 'activo' : 'inactivo'}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={() => navigate(`/dashboard/clientes/visualizar/${cliente._id}`)}
                  >
                    Ver
                  </button>
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