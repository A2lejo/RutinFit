import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDarkMode from "@assets/dark.png";
import logoFacebook from "@assets/facebook.png";
import logoGithub from "@assets/github.png";
import logoLinkedind from "@assets/linkedin.png";
import logoRocket from "@assets/rocket.webp";
import iconoMujer from "@assets/icono_mujer.jpeg";
import iconoHombre from "@assets/icono_hombre.jpeg";

const Home = () => {
  const [darkMode, setdarkMode] = useState(false)
  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800">
        <section>
          <nav className="p-10 mb-12 flex justify-between">
            <div className="flex items-start space-x-6">
              <img
                src={iconoMujer}
                alt="icono-mujer"
                width={45}
                height={45}
                className=""
              />
              <h1 className="text-6xl font-italianno dark:text-white">
                Rutin<span className="text-[#82E5B5]">Fit</span>
              </h1>
              <img
                src={iconoHombre}
                alt="icono-hombre"
                width={45}
                height={45}
                className=""
              />
            </div>
            <ul className="flex items-center">
              <li>
                <img
                  onClick={() => setdarkMode(!darkMode)}
                  className="cursor-pointer"
                  src={logoDarkMode}
                  alt="logo"
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Link
                  to="/APP"
                  className=" bg-[#82E5B5] text-slate-700 px-6 py-2 rounded-full ml-8 hover:bg-teal-600 hover:text-white"
                  href="#"
                >
                  RutinFit App Clientes
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="bg-[#82E5B5] text-slate-700 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white"
                  href="#"
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className="text-center">
            <h2 className="text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Proyect Demo
            </h2>
            <h3 className="text-2xl py-2 md:text-3xl dark:text-white">
              Scalable and Responsive
            </h3>
            <p className="text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel vero
              dolore pariatur asperiores voluptatibus sunt optio iste atque
              animi id odio aliquid sapiente voluptatem, accusantium, ea sed
              quibusdam a. Itaque.
            </p>
          </div>

          <div className="text-5xl flex justify-center gap-16 py-3">
            <img
              src={logoFacebook}
              alt="logo-redes"
              width={50}
              height={50}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />

            <img
              src={logoGithub}
              alt="logo-redes"
              width={50}
              height={50}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />

            <img
              src={logoLinkedind}
              alt="logo-redes"
              width={50}
              height={50}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />
          </div>

          <div className="relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300">
            <img src={logoRocket} alt="logo-rocket" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home