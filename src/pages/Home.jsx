import React from 'react';
import NavbarPrincipal from '../components/NavbarPrincipal';
import Footer from '../components/Footer';
import FondoHome from '../assets/fondoHome.jpg';
import appRutinFit from '../assets/appGym.png';
import { FaPhoneAlt, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Contacto from '@assets/contacto.jpg';

const Home = () => {
  return (
    <div className="relative z-0">
      <NavbarPrincipal />
      <main className="bg-white px-4 sm:px-10 md:px-20">
        <section className="relative bg-cover bg-center rounded-3xl overflow-hidden mx-auto" style={{ backgroundImage: `url(${FondoHome})`, width: '100%', height: '35rem' }}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h2 className="text-3xl sm:text-5xl py-2 font-medium md:text-6xl font-serif">
              Entrenamiento <span className="text-[#82E5B5]">personalizado</span>
            </h2>
          </div>
        </section>
      </main>
      <section className='text-left mx-10 my-10'>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/3 p-4 bg-[#0D9588] rounded-lg m-2 transition-opacity duration-500 ease-in-out opacity-75 hover:opacity-100">
            <h2 className="text-3xl sm:text-3xl font-medium md:text-4xl font-serif mb-4"> ¿Por qué elegirnos?</h2>
            <p className="text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0 text-white text-justify">
              En Rutin Fit, te ofrecemos un entrenamiento personalizado, adaptado a tus necesidades y objetivos. Nuestros profesionales te guiarán, para que puedas alcanzar tus metas sin necesidad de tener que contar con un entrenador presencial. ¡No esperes más y comienza a entrenar con nosotros!
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-[#0D9588] rounded-lg m-2 transition-opacity duration-500 ease-in-out opacity-75 hover:opacity-100">
            <h2 className="text-3xl sm:text-3xl font-medium md:text-4xl font-serif mb-4"> ¿Quieres ser parte?</h2>
            <p className='text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0 text-white text-justify'>
              ¡Únete a nosotros! Puedes ser parte de este equipo. Si tienes experiencia como entrenador comunicate con nosotros, de esta manera ayudarás a que personas que lo necesitan puedan mejorar su condición física, con tu ayuda ellos podrán alcanzar metas de manera más sencilla.
            </p>
          </div>
          <div className="w-full md:w-1/3 p-4 bg-[#0D9588] rounded-lg m-2 transition-opacity duration-500 ease-in-out opacity-75 hover:opacity-100">
            <h2 className="text-3xl sm:text-3xl font-medium md:text-4xl font-serif mb-4"> ¿Eres nuevo?</h2>
            <p className='text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0 text-white text-justify'>
              Si eres uno de nuestros nuevos clientes. ¡Bienvenido! Tienes a tu disposición varios entrenadores los cuales cuentan con experiencia para poder ayudarte a cumplir tus objetivos, así que descarga la aplicación la cual está diseñada específicamente para los clientes y empecemos con tu entrenamiento.
            </p>
          </div>
        </div>
      </section>
      <section id='contact-section' className=' bg-[#82E5B5]'>
        <div className='text-left mx-10 my-10 p-4'>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-2xl sm:text-xl py-2 font-medium md:text-5xl font-serif"> Contáctanos</h2>
            <p className="text-xs sm:text-sm py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0 text-justify">
              Quieres mejorar tu rendimiento físico, pero no sabes por dónde empezar. ¡No te preocupes! En Rutin Fit, te ofrecemos la mejor solución para que puedas entrenar de forma segura y efectiva. Contacta con nosotros y comienza a disfrutar de los beneficios de un entrenamiento personalizado.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center bg-teal-600 py-6 px-5 rounded-3xl">
            <div className="w-full md:w-1/2 bg-[#16A39C] py-10 px-6 rounded-3xl">
              <h2 className="text-2xl sm:text-xl font-medium md:text-3xl font-serif">Información</h2>
              <p className="text-xs sm:text-sm py-5 leading-6 md:text-lg max-w-lg mx-auto md:mx-0">
                Comunicate con nosotros a través de nuestro correo electrónico o número de teléfono. ¡Estamos para ayudarte!
              </p>
              <div className="flex flex-col space-y-4 ml-5">
                <div className="flex items-center space-x-2">
                  <FaPhoneAlt className="text-white" />
                  <span className="text-white">+593 968862213</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-white" />
                  <a href="mailto:rutinfit24@gmail.com" className="text-white">rutinfit24@gmail.com</a>
                </div>
                <div className="flex items-center space-x-5">
                  <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                    <FaFacebook className="text-white" />
                  </a>
                  <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                    <FaInstagram className="text-white" />
                  </a>
                  <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                    <FaTwitter className="text-white" />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center p-1 h-80">
              <img src={Contacto} alt="Contacto" className="rounded-3xl shadow-lg w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className='text-left mx-10 my-10'>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl sm:text-5xl py-2 font-medium md:text-6xl font-serif"> App de Rutin<span className="text-[#82E5B5]">Fit</span></h2>
            <p className="text-sm sm:text-md py-5 leading-8 md:text-xl max-w-lg mx-auto md:mx-0 text-justify">
              No importa si ya tienes experiencia o si recién estás comenzando a practicar actividad física, una cosa es segura: ¡al descargar gratis la aplicación Rutin Fit, obtienes el mejor aliado para tu rutina de entrenamiento!
            </p>
            <div className="flex justify-center md:justify-start pb-4">
              <a href="https://apkpure.com/es/rutinfit/com.djms.rutinfitapp" target="_blank" rel="noopener noreferrer" className="bg-[#82E5B5] text-black px-4 py-2 rounded-full hover:bg-teal-600 hover:text-white">
                Descargar
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={appRutinFit} alt="App de RutinFit" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;