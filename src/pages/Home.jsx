import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoDarkMode from "@assets/dark.png";
import logoFacebook from "@assets/facebook.png";
import logoGithub from "@assets/github.png";
import logoLinkedind from "@assets/linkedin.png";
import logoRocket from "@assets/rocket.webp";
import iconoMujer from "@assets/icono_mujer.jpeg";
import iconoHombre from "@assets/icono_hombre.jpeg";

const Home = () => {
  const [darkMode, setdarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className="bg-white px-4 sm:px-10 md:px-20 lg:px-40 dark:bg-gray-800">
        <section>
          <nav className="p-4 sm:p-8 mb-10 flex justify-between items-center">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <img
                src={iconoMujer}
                alt="icono-mujer"
                width={30}
                height={30}
                className=""
              />
              <h1 className="text-2xl sm:text-4xl font-italianno dark:text-white">
                Rutin<span className="text-[#82E5B5]">Fit</span>
              </h1>
              <img
                src={iconoHombre}
                alt="icono-hombre"
                width={30}
                height={30}
                className=""
              />
            </div>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <img
                onClick={() => setdarkMode(!darkMode)}
                className="cursor-pointer"
                src={logoDarkMode}
                alt="logo"
                width={30}
                height={30}
              />
              <button
                className="sm:hidden flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
                </svg>
              </button>
              <ul className={`sm:flex items-center ${menuOpen ? 'block' : 'hidden'}`}>
                <li>
                  <Link
                    to="/APP"
                    className="bg-[#82E5B5] text-slate-700 px-4 py-1 rounded-full hover:bg-teal-600 hover:text-white"
                  >
                    App
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="bg-[#82E5B5] text-slate-700 px-4 py-1 rounded-full hover:bg-gray-900 hover:text-white" href="#"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="text-center">
            <h2 className="text-3xl sm:text-5xl py-2 text-teal-600 font-medium md:text-6xl">
              Proyect Demo
            </h2>
            <h3 className="text-xl sm:text-2xl py-2 md:text-3xl dark:text-white">
              Scalable and Responsive
            </h3>
            <p className="text-sm sm:text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel vero
              dolore pariatur asperiores voluptatibus sunt optio iste atque
              animi id odio aliquid sapiente voluptatem, accusantium, ea sed
              quibusdam a. Itaque.
            </p>
          </div>

          <div className="text-3xl sm:text-5xl flex justify-center gap-8 sm:gap-16 py-3">
            <img
              src={logoFacebook}
              alt="logo-redes"
              width={40}
              height={40}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />

            <img
              src={logoGithub}
              alt="logo-redes"
              width={40}
              height={40}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />

            <img
              src={logoLinkedind}
              alt="logo-redes"
              width={40}
              height={40}
              className={'dark:border-2 border-teal-300 rounded-full'}
            />
          </div>

          <div className="relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-60 h-60 sm:w-80 sm:h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300">
            <img src={logoRocket} alt="logo-rocket" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home