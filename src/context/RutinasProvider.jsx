import React, { createContext, useState } from 'react';

const RutinasContext = createContext();

export const RutinasProvider = ({ children }) => {
  const [rutinas, setRutinas] = useState([]);
  const [modal, setModal] = useState(false);
  const [alertaRutina, setAlertaRutina] = useState({});
  const [dataModal, setDataModal] = useState({});

  const handleModal = () => {
    setModal(!modal);
  };

  const eliminarEjercicio = (rutinaId, ejercicioId) => {
    setRutinas((prevRutinas) =>
      prevRutinas.map((rutina) =>
        rutina.id === rutinaId
          ? {
              ...rutina,
              ejercicios: rutina.ejercicios.filter((ejercicio) => ejercicio.id !== ejercicioId),
            }
          : rutina
      )
    );
    setAlertaRutina({ respuesta: 'Ejercicio eliminado correctamente', exito: true });
  };

  return (
    <RutinasContext.Provider
      value={{
        rutinas,
        setRutinas,
        modal,
        handleModal,
        alertaRutina,
        setAlertaRutina,
        dataModal,
        setDataModal,
        eliminarEjercicio,
      }}
    >
      {children}
    </RutinasContext.Provider>
  );
};

export default RutinasContext;