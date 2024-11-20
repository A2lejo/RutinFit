import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const RutinasContext = createContext();

export const RutinasProvider = ({ children }) => {
  const [rutinas, setRutinas] = useState([]);
  const [dataModal, setDataModal] = useState(null);
  const [modal, setModal] = useState(false);
  const [exercises, setExercises] = useState([]);

  const handleModal = () => {
    setModal(!modal);
  };

  const registrarRutina = async (form) => {
    try {
      console.log('Datos enviados:', form); // Agregar log para verificar los datos enviados
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
      setRutinas([...rutinas, respuesta.data.rutina]);
    } catch (error) {
      console.error('Error al registrar la rutina:', error);
    }
  };

  const actualizarRutina = async (form, id) => {
    try {
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
      setRutinas(rutinas.map(rutina => rutina._id === id ? respuesta.data.rutina : rutina));
    } catch (error) {
      console.error('Error al actualizar la rutina:', error);
    }
  };

  const eliminarRutina = async (id) => {
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
      setRutinas(rutinas.filter(rutina => rutina._id !== id));
    } catch (error) {
      console.error('Error al eliminar la rutina:', error);
    }
  };

  const obtenerRutinas = async () => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/routine/view-routines`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setRutinas(respuesta.data.rutinas);
    } catch (error) {
      console.error('Error al obtener las rutinas:', error);
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
      return respuesta.data.rutina;
    } catch (error) {
      console.error('Error al obtener la rutina:', error);
    }
  };

  const obtenerEjercicios = async () => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/exercises/details/all`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Ejercicios:', respuesta.data.exercises);
      setExercises(respuesta.data.exercises);
    } catch (error) {
      console.error('Error al obtener los ejercicios:', error);
    }
  };

  useEffect(() => {
    obtenerEjercicios();
  }, []);

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
        obtenerRutinas,
        obtenerRutinaPorId,
        obtenerEjercicios,
        exercises,
        setDataModal,
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasContext;