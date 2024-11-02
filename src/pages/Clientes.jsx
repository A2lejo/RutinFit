import React, { useState } from 'react';
import { confirmDeleteAlert, successAlert } from '../utils/AlertFunctions.js';
import TablaClientes from '../components/TablaClientes';

const Clientes = () => {
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '+123 456 7890', estado: 'activo' },
    { id: 2, nombre: 'Luis Martínez', email: 'luis@example.com', telefono: '+123 456 7891', estado: 'activo' },
    { id: 3, nombre: 'Sofía Rodríguez', email: 'sofia@example.com', telefono: '+123 456 7892', estado: 'activo' },
  ]);

  // Estado para la búsqueda
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await confirmDeleteAlert();
    if (confirmDelete) {
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      successAlert('El cliente ha sido eliminado.');
    }
  };

  // Filtrar clientes basados en la búsqueda
  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(search.toLowerCase())
  );

  // Simulación de autenticación y rol del usuario
  const auth = { rol: 'admin' }; // Cambia esto según el rol del usuario

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">Clientes Registrados</h1>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="border-2 w-full p-2 rounded-md"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {filteredClientes.length === 0 ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">No existen registros</p>
          <p>Actualmente no hay clientes registrados.</p>
        </div>
      ) : (
        <TablaClientes clientes={filteredClientes} handleDelete={handleDelete} auth={auth} />
      )}
    </div>
  );
};

export default Clientes;