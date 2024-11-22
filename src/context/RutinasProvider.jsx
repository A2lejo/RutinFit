import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { successUpdateAlert, errorAlert, confirmDeleteAlert, ConfirmAlert, successAlert } from '@utils/AlertFunctions';

const RutinasContext = createContext();

export const RutinasProvider = ({ children }) => {
  const [rutinas, setRutinas] = useState([]);
  const [dataModal, setDataModal] = useState(null);
  const [modal, setModal] = useState(false);

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
      setRutinas([...rutinas, respuesta.data.newRoutine]);
      ConfirmAlert('Rutina registrada correctamente');
    } catch (error) {
      console.error('Error al registrar la rutina:', error);
      errorAlert('Error al registrar la rutina');
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
      successUpdateAlert('Rutina actualizada correctamente');
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
      setRutinas(rutinas.filter(rutina => rutina._id !== id));
      successAlert('Rutina eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la rutina:', error);
      errorAlert('Error al eliminar la rutina');
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
      console.log('Rutina obtenida:', respuesta.data.routine);
      return respuesta.data.routine;
    } catch (error) {
      console.error('Error al obtener la rutina:', error);
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
        obtenerRutinas,
        obtenerRutinaPorId,
        setDataModal,
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasContext;