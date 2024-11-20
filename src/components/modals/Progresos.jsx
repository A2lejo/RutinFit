import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';

const ModalHistorialProgresos = ({ clienteId, handleClose }) => {
  const [progresos, setProgresos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProgresos = async () => {
      try {
        const respuesta = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/progress/client/${clienteId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('respuesta:', respuesta.data);
        setProgresos(respuesta.data.progress);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los progresos:', error);
        setError('Error al obtener los progresos');
        setLoading(false);
      }
    };

    obtenerProgresos();
  }, [clienteId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Historial de Progresos</h2>
          <button onClick={handleClose}>
            <MdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p>{error}</p>
          ) : progresos.length === 0 ? (
            <p>No hay registros de progresos</p>
          ) : (
            <ul>
              {progresos.map((progreso, index) => (
                <li key={index} className="mb-2">
                  <p><strong>Fecha:</strong> {new Date(progreso.start_date).toLocaleDateString()}</p>
                  <p><strong>Peso Actual:</strong> {progreso.currentWeight} kg</p>
                  <p><strong>Observaciones:</strong> {progreso.observations}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalHistorialProgresos;