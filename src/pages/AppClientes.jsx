import React from 'react';
import NavbarPrincipal from '../components/NavbarPrincipal';
import Footer from '../components/Footer';
import appRutinFit from '../assets/appGym.png';

const AppClientes = () => {

    return (
        <div>
            <NavbarPrincipal />
            <main className="bg-white px-4 sm:px-10 md:px-20 lg:px-40 dark:bg-gray-800">
                <section className='text-left mx-10 my-10'>
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl sm:text-5xl py-2 font-medium md:text-6xl font-serif"> Conoce nuestra aplicación Rutin<span className="text-[#82E5B5]">Fit</span></h2>
                            <p className="text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0">
                                Ahora podrás tener en la palma de tu mano tu entrenamiento en cualquier momento.
                            </p>
                            <p className="text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0">      
                            <spam className="font-bold">¡YA NO TIENES EXCUSAS! </spam>  Descarga la app y solicita a uno de nuestros entrenadores que realice tu rutina de entrenamiento. En la App podrás consultar tu rutina completa,
                            </p>
                            <div className="flex justify-center md:justify-start pb-4">
                                <button className="bg-[#82E5B5] text-black px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white">
                                    Descargar
                                </button>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 flex justify-center">
                            <img src={appRutinFit} alt="App de RutinFit" className="rounded-lg shadow-lg" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AppClientes;