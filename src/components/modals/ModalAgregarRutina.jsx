import React, { useState, useContext, useEffect } from 'react';
import RutinasContext from '@context/RutinasProvider';

const ModalAgregarRutina = ({ clienteId, coachId, days }) => {
  const { handleModal, registrarRutina, actualizarRutina, dataModal, obtenerEjercicios, filteredExercises, rutinas, setRutinas } = useContext(RutinasContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [form, setForm] = useState({
    client_id: clienteId, 
    coach_id: coachId,
    nameRoutine: dataModal?.nameRoutine ?? '',
    start_date: dataModal ? formatDate(dataModal.start_date) : '',
    end_date: dataModal ? formatDate(dataModal.end_date) : '',
    duration_days: dataModal?.duration_days ?? 0,
    days: dataModal?.days ?? days.map(day => ({ day, exercises: [] })),
    comments: dataModal?.comments ?? '',
    _id: dataModal?._id ?? null,
  });

  const [searches, setSearches] = useState(days.map(() => ''));
  const [suggestions, setSuggestions] = useState(days.map(() => []));

  useEffect(() => {
    if (dataModal) {
      setForm({
        client_id: dataModal.client_id._id,
        coach_id: dataModal.coach_id._id,
        nameRoutine: dataModal.nameRoutine,
        start_date: formatDate(dataModal.start_date),
        end_date: formatDate(dataModal.end_date),
        duration_days: dataModal.duration_days,
        days: dataModal.days,
        comments: dataModal.comments,
        _id: dataModal._id,
      });
      console.log("Id de la rutina: ", dataModal._id);
    } else {
      setForm({
        client_id: clienteId,
        coach_id: coachId,
        nameRoutine: '',
        start_date: '',
        end_date: '',
        duration_days: 0,
        days: days.map(day => ({ day, exercises: [] })),
        comments: '',
        _id: null,
      });
    }
    console.log(form);  

  }, [dataModal, clienteId, coachId, days]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearchChange = async (index, e) => {
    const newSearches = [...searches];
    newSearches[index] = e.target.value;
    setSearches(newSearches);
    const searchQuery = e.target.value;
    if (searchQuery) {
      await obtenerEjercicios(searchQuery);
      const newSuggestions = [...suggestions];
      newSuggestions[index] = filteredExercises;
      setSuggestions(newSuggestions);
    } else {
      const newSuggestions = [...suggestions];
      newSuggestions[index] = [];
      setSuggestions(newSuggestions);
    }
  };

  const handleExerciseSelect = (dayIndex, exercise) => {
    const newDays = [...form.days];
    if (!newDays[dayIndex].exercises.some(e => e._id === exercise._id)) {
      newDays[dayIndex].exercises.push(exercise);
    }
    setForm({ ...form, days: newDays });
    const newSuggestions = [...suggestions];
    newSuggestions[dayIndex] = [];
    setSuggestions(newSuggestions);
  };

  const handleExerciseRemove = (dayIndex, exerciseId) => {
    const newDays = [...form.days];
    newDays[dayIndex].exercises = newDays[dayIndex].exercises.filter(e => e._id !== exerciseId);
    setForm({ ...form, days: newDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dataModal) {
      console.log("Id de la rutina actualizar: ", dataModal._id);
      await actualizarRutina(form, dataModal._id);
    } else {
      await registrarRutina(form);
      setRutinas([...rutinas, form]);
    }
    handleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{dataModal ? 'Editar Rutina' : 'Agregar Rutina'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameRoutine">
              Nombre de la Rutina
            </label>
            <input
              id="nameRoutine"
              name="nameRoutine"
              type="text"
              className="border-2 w-full p-2 rounded-md" 
              value={form.nameRoutine}
              onChange={handleChange}
              required
            />
          </div>
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
                  placeholder="Escribe para buscar..."
                />
                {suggestions[index].length > 0 && (
                  <ul className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                    {suggestions[index].map((exercise) => (
                      <li
                        key={exercise._id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleExerciseSelect(index, exercise)}
                      >
                        {exercise.name}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-2">
                  <h3 className="text-lg font-bold mb-2">Ejercicios Seleccionados</h3>
                  <ul>
                    {dayObj.exercises.map((exercise) => (
                      <li key={exercise._id} className="flex items-center">
                        {exercise.name}
                        <button onClick={() => handleExerciseRemove(index, exercise._id)} className="ml-2 text-red-500">X</button>
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
          <div className="flex flex-col sm:flex-row justify-end">
            <button
              type="button"
              onClick={handleModal}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mb-2 sm:mr-2 sm:mb-0 hover:bg-gray-700"
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