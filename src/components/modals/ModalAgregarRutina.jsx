import React, { useState, useContext, useEffect } from 'react';
import RutinasContext from '@context/RutinasProvider';

const ModalAgregarRutina = ({ clienteId, coachId, days }) => {
  const { handleModal, registrarRutina, actualizarRutina, dataModal, exercises } = useContext(RutinasContext);

  const [form, setForm] = useState({
    client_id: clienteId,
    coach_id: coachId,
    start_date: dataModal?.start_date ?? '',
    end_date: dataModal?.end_date ?? '',
    duration_days: dataModal?.duration_days ?? 0,
    days: dataModal?.days ?? days.map(day => ({ day, exercises: [] })), // Inicializa los días con ejercicios vacíos
    comments: dataModal?.comments ?? '',
  });

  const [searches, setSearches] = useState(days.map(() => '')); // Estado de búsqueda independiente para cada día

  useEffect(() => {
    console.log('dataModal:', dataModal); // Verificar el contenido de dataModal
    if (dataModal) {
      setForm({
        client_id: dataModal.client_id._id,
        coach_id: dataModal.coach_id._id,
        start_date: dataModal.start_date,
        end_date: dataModal.end_date,
        duration_days: dataModal.duration_days,
        days: dataModal.days,
        comments: dataModal.comments,
      });
    } else {
      setForm({
        client_id: clienteId,
        coach_id: coachId,
        start_date: '',
        end_date: '',
        duration_days: 0,
        days: days.map(day => ({ day, exercises: [] })), // Inicializa los días con ejercicios vacíos
        comments: '',
      });
    }
  }, [dataModal, clienteId, coachId, days]);

  useEffect(() => {
    console.log('form:', form); // Verificar el estado form después de inicializarlo
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (index, e) => {
    const newSearches = [...searches];
    newSearches[index] = e.target.value;
    setSearches(newSearches);
  };

  const handleExerciseSelect = (dayIndex, exercise) => {
    const newDays = [...form.days];
    if (!newDays[dayIndex].exercises.some(e => e._id === exercise._id)) {
      newDays[dayIndex].exercises.push(exercise);
    }
    setForm({ ...form, days: newDays });
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
          {form.days.map((dayObj, index) => (
            <div className="mb-4" key={index}>
              <h3 className="text-lg font-bold mb-2">{dayObj.day.charAt(0).toUpperCase() + dayObj.day.slice(1)}</h3>
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`search-${index}`}>
                  Buscar Ejercicios
                </label>
                <input
                  id={`search-${index}`}
                  name="search"
                  type="text"
                  className="border-2 w-full p-2 rounded-md"
                  value={searches[index]}
                  onChange={(e) => handleSearchChange(index, e)}
                />
                <ul className="mt-2">
                  {exercises && exercises.filter(exercise =>
                    exercise.name.toLowerCase().includes(searches[index].toLowerCase())
                  ).map((exercise) => (
                    <li key={exercise._id} onClick={() => handleExerciseSelect(index, exercise)}>
                      {exercise.name}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <h3 className="text-lg font-bold mb-2">Ejercicios Seleccionados</h3>
                  <ul>
                    {dayObj.exercises.map((exercise) => (
                      <li key={exercise._id}>
                        {exercise.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
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