import React, { useState, useContext, useEffect } from 'react';
import RutinasContext from '@context/RutinasProvider';

const ModalAgregarRutina = ({ clienteId, coachId, days }) => {
  const { handleModal, registrarRutina, actualizarRutina, dataModal } = useContext(RutinasContext);

  const [form, setForm] = useState({
    client_id: clienteId,
    coach_id: coachId, 
    start_date: dataModal?.start_date ?? '',
    end_date: dataModal?.end_date ?? '',
    duration_days: dataModal?.duration_days ?? 0,
    day: dataModal?.day ?? days[0], // Seleccionar el primer día por defecto
    comments: dataModal?.comments ?? '',
  });

  useEffect(() => {
    if (!dataModal) {
      setForm({
        client_id: clienteId,
        coach_id: coachId,
        start_date: '',
        end_date: '',
        duration_days: 0,
        day: days[0],
        comments: '',
      });
    }
  }, [dataModal, clienteId, coachId, days]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form); // Agregar log para verificar los datos del formulario
    dataModal ? actualizarRutina(form, dataModal._id) : registrarRutina(form);
    handleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{dataModal ? 'Editar Rutina' : 'Agregar Rutina'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date">
              Fecha de Inicio
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="border-2 w-full p-2 rounded-md"
              value={form.start_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_date">
              Fecha de Fin
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="border-2 w-full p-2 rounded-md"
              value={form.end_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
              Día
            </label>
            <select
              id="day"
              name="day"
              className="border-2 w-full p-2 rounded-md"
              value={form.day}
              onChange={handleChange}
              required
            >
              {days.map((day, index) => (
                <option key={index} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comments">
              Comentarios
            </label>
            <textarea
              id="comments"
              name="comments"
              className="border-2 w-full p-2 rounded-md"
              value={form.comments}
              onChange={handleChange}
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
              {dataModal ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAgregarRutina;