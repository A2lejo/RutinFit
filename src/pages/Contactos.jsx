import React from 'react';
import NavbarPrincipal from '../components/NavbarPrincipal';
import Footer from '../components/Footer';

const Contactos = () => {
    return (
        <div>
            <NavbarPrincipal />
            <main>
                <h2 className='text-[#82E5B5] py-5 px-4 sm:px-10 md:px-20 lg:px-40 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
                    Contáctanos
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-center py-2 px-10 bg-white">
                    <div className="w-full md:w-1/2 p-4">
                        <h1 className="text-3xl font-bold mb-4">¡Hola!</h1>
                        <p className="text-lg">
                            Escribe tus datos y cuéntanos tu inquietud. Te daremos una respuesta en menos de 24 horas laborables.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 p-4">
                        <form className="bg-white shadow-custom rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                    Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre"
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
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="provincia">
                                    Provincia
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="provincia"
                                    type="text"
                                    placeholder="Provincia"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ciudad">
                                    Ciudad
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="ciudad"
                                    type="text"
                                    placeholder="Ciudad"
                                />
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
                                ></textarea>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-[#82E5B5] hover:bg-teal-600 text-black hover:text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
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
