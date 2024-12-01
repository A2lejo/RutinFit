import React, { useState } from 'react';
import NavbarPrincipal from '../components/NavbarPrincipal';
import Footer from '../components/Footer';
import { FaPhoneAlt } from 'react-icons/fa';
import axios from 'axios';

const Contactos = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        usuario: '',
        asunto: '',
        mensaje: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.correo || !formData.asunto || !formData.mensaje) {
            alert('Por favor, completa todos los campos.');
            return;
        }
        try {
            const response = await axios.post(
                'https://api.sendinblue.com/v3/smtp/email',
                {
                    sender: { email: formData.correo, name: formData.nombre },
                    to: [{ email: 'rutinfit24@gmail.com' }],
                    subject: formData.asunto,
                    htmlContent: `
                        <p><strong>Nombre:</strong> ${formData.nombre}</p>
                        <p><strong>Correo:</strong> ${formData.correo}</p>
                        <p><strong>¿Es usuario?:</strong> ${formData.usuario}</p>
                        <p><strong>Mensaje:</strong> ${formData.mensaje}</p>
                    `,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'api-key': import.meta.env.VITE_SENDINBLUE_API_KEY,
                    },
                }
            );
            console.log('Correo enviado:', response.data);
            alert('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error.response ? error.response.data : error.message);
            alert('Error al enviar el correo: ' + (error.response ? error.response.data : error.message));
        }
    };

    return (
        <div>
            <NavbarPrincipal />
            <main>
                <div className='text-center font-serif'>
                    <h2 className='text-[#82E5B5] py-5 px-4 sm:px-10 md:px-20 lg:px-40  text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                        Contáctanos
                    </h2>
                    <div className='text-xs sm:text-sm py-5 md:text-xl max-w-lg mx-auto md:text-center bg-[#16A39C] rounded-3xl'>
                        <p>
                            Puedes comunicarte con nosotros a través de nuestro número de teléfono:
                        </p>
                        <div className="flex items-center space-x-1 py-4 px-44">
                            <FaPhoneAlt className="text-white" />
                            <span className="text-white">+123 456 7890</span>
                        </div>
                        <p>
                            o enviarnos un correo:
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center py-2 px-10 bg-white">
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-4">¡Hola!</h1>
                        <p className="text-lg">
                            Escribe tus datos y cuéntanos tu inquietud. Te daremos una respuesta en menos de 24 horas laborables.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <form className="bg-white shadow-custom rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                                    Correo
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="correo"
                                    type="email"
                                    placeholder="Correo"
                                    value={formData.correo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usuario">
                                    ¿Eres usuario?
                                </label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                        id="usuario"
                                        value={formData.usuario}
                                        onChange={handleChange}
                                    >
                                        <option>Sí</option>
                                        <option>No</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M10 3a1 1 0 0 1 .707 1.707L6.414 9H17a1 1 0 1 1 0 2H6.414l4.293 4.293A1 1 0 0 1 10 17a1 1 0 0 1-.707-1.707L13.586 10 9.293 5.707A1 1 0 0 1 10 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="asunto">
                                    Asunto
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="asunto"
                                    type="text"
                                    placeholder="Asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mensaje">
                                    Mensaje
                                </label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="mensaje"
                                    placeholder="Escribe tu mensaje aquí..."
                                    rows="4"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-[#82E5B5] hover:bg-teal-600 text-black hover:text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contactos;