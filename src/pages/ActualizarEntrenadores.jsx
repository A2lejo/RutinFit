import { FormularioEntrenadores } from "@components/FormularioEntrenadores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Alertas from "@components/Alertas";
import axios from "axios";

const ActualizarEntrenador = () => {
  const { id } = useParams();
  const [entrenador, setEntrenador] = useState({
    _id: id,
    nombre: 'Juan',
    apellido: 'Pérez',
    especialidad: 'Cardio',
    email: 'juan@example.com',
    telefono: '+123 456 7890',
    estado: 'activo',
  });
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    // Comentamos la lógica de la solicitud a la API para usar datos quemados
    // const consultarEntrenador = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_BACKEND_URL}/entrenador/${id}`,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //       }
    //     );
    //     setEntrenador(response.data.entrenador);
    //   } catch (error) {
    //     setAlerta({
    //       respuesta: `No existe un entrenador con el id ${id}`,
    //       exito: false,
    //     });
    //   }
    // };
    // consultarEntrenador();
  }, [id]);

  return (
    <div>
      <h1 className="font-black text-4xl text-[#0D9488]">Actualizar Entrenador</h1>
      <p className="mb-8 my-4">
        Actualiza los datos del entrenador con el id {id}
      </p>
      {entrenador ? (
        <FormularioEntrenadores entrenador={entrenador} />
      ) : (
        alerta.respuesta && (
          <Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
        )
      )}
    </div>
  );
};

export default ActualizarEntrenador;