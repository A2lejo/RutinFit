import React, { createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { successUpdateAlert, errorAlert, confirmDeleteAlert, ConfirmAlert, successAlert } from '@utils/AlertFunctions';

const RutinasContext = createContext();

export const RutinasProvider = ({ children }) => {
  const [rutinas, setRutinas] = useState([]);
  const [dataModal, setDataModal] = useState(null);
  const [modal, setModal] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const handleModal = () => {
    setModal(!modal);
  };

  const registrarRutina = async (form) => {
    try {
      const respuesta = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/routine/create-routine`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      ConfirmAlert('', 'Rutina registrada correctamente');
      setRutinas([...rutinas, respuesta.data.rutina]);
      window.location.reload();
    } catch (error) {
      console.error('Error al registrar la rutina:', error);
      errorAlert('Error al registrar la rutina');
    }
  };

  

  const actualizarRutina = async (form, id) => {

    try {
      console.log("id de la rutina: ", id); 
      const respuesta = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/routine/update-routine/${id}`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(respuesta.data);
      successUpdateAlert('Rutina actualizada correctamente');

      const rutinasActualizadas = rutinas.map((rutina) =>
        rutina._id === id ? respuesta.data.updatedRoutine : rutina
      );
      setRutinas(rutinasActualizadas);
      window.location.reload();

    } catch (error) {
      console.error('Error al actualizar la rutina:', error);
      errorAlert('Error al actualizar la rutina');
    }
  };

  const eliminarRutina = async (id) => {
    const confirmed = await confirmDeleteAlert();
    if (!confirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/routine/delete-routine/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      successAlert('Rutina eliminada correctamente');
      const rutinasActualizadas = rutinas.filter((rutina) => {
        return rutina._id !== id;
      }) 
      setRutinas(rutinasActualizadas);
    } catch (error) {
      console.error('Error al eliminar la rutina:', error);
      errorAlert('Error al eliminar la rutina');
    }
  };

  const obtenerRutinaPorId = async (id) => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/routine/view-routine/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      return respuesta.data.routine;
    } catch (error) {
      console.error('Error al actualizar la rutina:', error.response ? error.response.data : error.message);
      errorAlert('Error al obtener la rutina');
    }
  };

  const obtenerEjercicios = async (searchQuery = '') => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/view-exercises`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const exercises = respuesta.data || []; // Asegúrate de que exercises es un array
      setFilteredExercises(
        exercises.filter(exercise =>
          exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      return exercises;
    } catch (error) {
      console.error('Error al obtener los ejercicios:', error);
      errorAlert('Error al obtener los ejercicios');
    }
  };

  const obtenerEjercicioPorId = async (id) => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/view-exercises/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      );
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener el ejercicio:', error);
      errorAlert('Error al obtener el ejercicio');
    }
  };


  return (
    <RutinasContext.Provider
      value={{
        rutinas,
        modal,
        dataModal,
        handleModal,
        registrarRutina,
        actualizarRutina,
        eliminarRutina,
        obtenerRutinaPorId,
        setDataModal,
        obtenerEjercicios,
        obtenerEjercicioPorId,
        filteredExercises,
        setFilteredExercises,
        setRutinas
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasContext;