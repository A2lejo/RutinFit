import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TablaEntrenadores from '../components/TablaEntrenadores';

const Entrenadores = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddEntrenador = () => {
    navigate('/dashboard/entrenadores/registrar');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">Entrenadores Registrados</h1>
        <button
          onClick={handleAddEntrenador}
          className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
        >
          <span className="md:hidden">Agregar</span>
          <span className="hidden md:inline">Agregar Entrenador</span>
        </button>
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
      <TablaEntrenadores search={search} />
    </div>
  );
};

export default Entrenadores;