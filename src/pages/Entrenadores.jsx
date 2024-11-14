import React, { useState } from 'react';
import axios from 'axios';
import { ConfirmAlert, errorAlert } from '../utils/AlertFunctions.js';
import TablaEntrenadores from '../components/TablaEntrenadores';
import { validateLetters } from '../utils/validations.js';

const Entrenadores = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    description: '',
  });
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'lastname') {
      if (!validateLetters(value)) return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/coach/register`,
        { 
          name: form.name, 
          lastname: form.lastname, 
          email: form.email, 
          description: form.description 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setIsModalOpen(false);
      ConfirmAlert('', 'El entrenador ha sido agregado.');
      // Actualizar la tabla de entrenadores
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        errorAlert('El correo ya está registrado');
      } else {
        console.error("Error al registrar entrenador:", error);
        errorAlert("Error al registrar entrenador. Por favor, intenta nuevamente.");
      }
    }
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
            <h2 className="text-2xl font-bold mb-4">
              Agregar <span className="hidden md:inline">Entrenador</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
                  Apellido
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Descripción
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={form.description}
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

export default Entrenadores;