import { createContext, useState } from "react";
import axios from "axios";

const RutinasContext = createContext();

const RutinasProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [dataModal, setDataModal] = useState({});
  const [rutinas, setRutinas] = useState([
    { id: 1, nombre: 'Rutina Cardio', descripcion: 'Ejercicios de cardio para mejorar la resistencia.', ejercicios: [] },
    { id: 2, nombre: 'Rutina Fuerza', descripcion: 'Ejercicios de fuerza para aumentar la musculatura.', ejercicios: [] },
    { id: 3, nombre: 'Rutina Flexibilidad', descripcion: 'Ejercicios de flexibilidad para mejorar el rango de movimiento.', ejercicios: [] },
  ]);
  const [alertaRutina, setAlertaRutina] = useState({});

  const handleModal = () => {
    setModal(!modal);
  };

  const registrarRutina = async (datos) => {
    try {
      const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rutinas`, datos);
      setRutinas([respuesta.data, ...rutinas]);
      setAlertaRutina({
        respuesta: "Rutina registrada con éxito",
        exito: true,
      });
    } catch (error) {
      setAlertaRutina({
        respuesta: error.response.data.message,
        exito: false,
      });
    }
  };

  const actualizarRutina = async (datos, id) => {
    try {
      const respuesta = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/rutinas/${id}`, datos);
      setRutinas(
        rutinas.map((rutina) =>
          rutina.id === id ? { ...rutina, ...datos } : rutina
        )
      );
      setAlertaRutina({
        respuesta: "Rutina actualizada con éxito",
        exito: true,
      });
    } catch (error) {
      setAlertaRutina({
        respuesta: error.response.data.message,
        exito: false,
      });
    }
  };

  const eliminarRutina = async (id) => {
    if (confirm(`¿Está seguro de eliminar la rutina ${id}`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/rutinas/${id}`);
        setRutinas(rutinas.filter((rutina) => rutina.id !== id));
        setAlertaRutina({
          respuesta: "Rutina eliminada con éxito",
          exito: true,
        });
        setTimeout(() => {
          setAlertaRutina({});
        }, 5000);
      } catch (error) {
        setAlertaRutina({
          respuesta: error.response.data.message,
          exito: false,
        });
        setTimeout(() => {
          setAlertaRutina({});
        }, 5000);
      }
    }
  };

  const registrarEjercicio = async (datos) => {
    try {
      const respuesta = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/ejercicios`, datos);
      const rutinaActualizada = rutinas.find((rutina) => rutina.id === datos.rutinaId);
      rutinaActualizada.ejercicios.push(respuesta.data);
      setRutinas([...rutinas]);
      setAlertaRutina({
        respuesta: "Ejercicio registrado con éxito",
        exito: true,
      });
    } catch (error) {
      setAlertaRutina({
        respuesta: error.response.data.message,
        exito: false,
      });
    }
  };

  const actualizarEjercicio = async (datos, id) => {
    try {
      const respuesta = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/ejercicios/${id}`, datos);
      const rutinaActualizada = rutinas.find((rutina) => rutina.id === datos.rutinaId);
      rutinaActualizada.ejercicios = rutinaActualizada.ejercicios.map((ejercicio) =>
        ejercicio.id === id ? { ...ejercicio, ...datos } : ejercicio
      );
      setRutinas([...rutinas]);
      setAlertaRutina({
        respuesta: "Ejercicio actualizado con éxito",
        exito: true,
      });
    } catch (error) {
      setAlertaRutina({
        respuesta: error.response.data.message,
        exito: false,
      });
    }
  };

  const eliminarEjercicio = async (rutinaId, ejercicioId) => {
    if (confirm(`¿Está seguro de eliminar el ejercicio ${ejercicioId}`)) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/ejercicios/${ejercicioId}`);
        const rutinaActualizada = rutinas.find((rutina) => rutina.id === rutinaId);
        rutinaActualizada.ejercicios = rutinaActualizada.ejercicios.filter((ejercicio) => ejercicio.id !== ejercicioId);
        setRutinas([...rutinas]);
        setAlertaRutina({
          respuesta: "Ejercicio eliminado con éxito",
          exito: true,
        });
        setTimeout(() => {
          setAlertaRutina({});
        }, 5000);
      } catch (error) {
        setAlertaRutina({
          respuesta: error.response.data.message,
          exito: false,
        });
        setTimeout(() => {
          setAlertaRutina({});
        }, 5000);
      }
    }
  };

  return (
    <RutinasContext.Provider
      value={{
        modal,
        setModal,
        handleModal,
        rutinas,
        alertaRutina,
        setRutinas,
        registrarRutina,
        actualizarRutina,
        eliminarRutina,
        registrarEjercicio,
        actualizarEjercicio,
        eliminarEjercicio,
        dataModal,
        setDataModal,
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export { RutinasProvider };
export default RutinasContext;