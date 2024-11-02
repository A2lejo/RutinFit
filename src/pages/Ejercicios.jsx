import React, { useState } from 'react';
import { ConfirmAlert, confirmDeleteAlert, successAlert } from '../utils/AlertFunctions.js';
import TablaEjercicios from '../components/TablaEjercicios.jsx';

const Ejercicios = () => {
  const [ejercicios, setEjercicios] = useState([
    { id: 1, nombre: 'Caminadora', descripcion: 'Correr 5 kilómetros.' },
    { id: 2, nombre: 'Press Banca', descripcion: '4 series de 12 con peso moderado.' },
    { id: 3, nombre: 'Sentadilla', descripcion: '4 series de 10 con peso moderado' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
  });

  // Estado para la búsqueda
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para agregar el ejercicio
    const newEjercicio = {
      id: ejercicios.length + 1,
      nombre: form.nombre,
      descripcion: form.descripcion,
    };
    setEjercicios([...ejercicios, newEjercicio]);
    setIsModalOpen(false);
    ConfirmAlert('Ejercicio agregado', 'El ejercicio ha sido agregado correctamente.');
  };

  const handleDelete = async (id) => {
    const confirmDelete = await confirmDeleteAlert();
    if (confirmDelete) {
      setEjercicios(ejercicios.filter((ejercicio) => ejercicio.id !== id));
      successAlert('El ejercicio ha sido eliminado.');
    }
  };

  // Filtrar ejercicios basados en la búsqueda
  const filteredEjercicios = ejercicios.filter((ejercicio) =>
    ejercicio.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#0D9488]">Ejercicios Registrados</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
        >
          <span className="md:hidden">Agregar</span>
          <span className="hidden md:inline">Agregar Ejercicio</span>
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
      {filteredEjercicios.length === 0 ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">No existen registros</p>
          <p>Actualmente no hay ejercicios registrados.</p>
        </div>
      ) : (
        <TablaEjercicios ejercicios={filteredEjercicios} handleDelete={handleDelete} auth={{ rol: 'admin' }} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              Agregar <span className="hidden md:inline">Ejercicio</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                  Descripción
                </label>
                <input
                  id="descripcion"
                  name="descripcion"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0 md:mr-2 hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
                >
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ejercicios;