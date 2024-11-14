import React, { useState, useContext } from 'react';
import RutinasContext from '@context/RutinasProvider';

const ModalAgregarRutina = ({ clienteId }) => {
  const { handleModal, registrarRutina, actualizarRutina, dataModal } = useContext(RutinasContext);

  const [form, setForm] = useState({
    nombre: dataModal?.nombre ?? '',
    descripcion: dataModal?.descripcion ?? '',
    clienteId,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dataModal?.nombre ? actualizarRutina(form, dataModal.id) : registrarRutina(form);
    handleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">{dataModal?.nombre ? 'Editar Ejercicio' : 'Agregar Ejercicio'}</h2>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeticiones">
              Repeticiones
            </label>
            <input
              id="repeticiones"
              name="repeticiones"
              type="number"
              className="border-2 w-full p-2 rounded-md"
              value={form.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="series">
              Series
            </label>
            <input
              id="series"
              name="series"
              type="number"
              className="border-2 w-full p-2 rounded-md"
              value={form.descripcion}
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white"
            >
              {dataModal?.nombre ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarRutina;