import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { successUpdateAlert, errorAlert, successAlert, ConfirmAlert } from "../../utils/AlertFunctions"; // Verificar la ruta
import { validateLetters } from '../../utils/validations';
import Alertas from '../Alertas';

const FormularioEntrenador = ({ modo }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    description: '',
  });
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    if (modo === 'actualizar' && id) {
      const consultarEntrenador = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/coach/view-coach/${id}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          );
          setForm({
            name: response.data.user_id.name,
            lastname: response.data.user_id.lastname,
            email: response.data.user_id.email,
            description: response.data.description,
          });
        } catch (error) {
          setAlerta({
            respuesta: `No existe un entrenador con el id ${id}`,
            exito: false,
          });
        }
      };
      consultarEntrenador();
    }
  }, [id, modo]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name' || name === 'lastname') {
      if (!validateLetters(value)) return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modo === 'agregar') {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/coach/register`,
          form,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        ConfirmAlert('','El entrenador ha sido agregado.');
        navigate('/dashboard/entrenadores');
      } else {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/coach/update-coach/${id}`,
          form,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        successUpdateAlert('Entrenador actualizado correctamente');
        navigate(`/dashboard/entrenadores`);
      }
    } catch (error) {
      if (modo === 'agregar' && error.response && error.response.status === 400) {
        errorAlert('El correo ya está registrado');
      } else {
        errorAlert('Error al procesar la solicitud. Por favor, intenta nuevamente.');
      }
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/entrenadores');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="font-black text-4xl text-[#0D9488]">
        {modo === 'agregar' ? 'Agregar' : 'Actualizar'}
      </h1>
      <p className="mb-8 my-4">
        {modo === 'agregar'
          ? 'Llena los campos para agregar un nuevo entrenador.'
          : 'Edita los campos necesarios y guarda los cambios.'}
      </p>
      {alerta.respuesta && (
        <Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="border-2 w-full p-2 rounded-md"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">
            Apellido
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            className="border-2 w-full p-2 rounded-md"
            value={form.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="border-2 w-full p-2 rounded-md"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="border-2 w-full p-2 rounded-md"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-[#0D9488] text-white px-4 py-2 rounded-md hover:bg-[#0B7A6A]"
          >
            {modo === 'agregar' ? 'Agregar' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEntrenador;