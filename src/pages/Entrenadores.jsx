import React, { useState } from 'react';
import TablaEntrenadores from '../components/TablaEntrenadores';
import FormularioEntrenador from '../components/profile/FormularioEntrenador'; // Verificar la ruta

const Entrenadores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">Entrenadores Registrados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <FormularioEntrenador modo="agregar" />
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entrenadores;