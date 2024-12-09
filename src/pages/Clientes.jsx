import React, { useState, useContext } from 'react';
import TablaClientes from '../components/TablaClientes';
import { AuthContext } from '@context/AuthProvider';
import { validateLetters } from '@utils/validations';

const Clientes = () => {
  const [search, setSearch] = useState('');
  const { auth } = useContext(AuthContext);


  const handleSearchChange = (e) => {
    const { value } = e.target
    if (validateLetters(value)) {
      setSearch(value);
    }
  };

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
      <TablaClientes search={search} auth={auth} />
    </div>
  );
};

export default Clientes;