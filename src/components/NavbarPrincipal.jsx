import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconoMujer from "@assets/icono_mujer.jpeg";
import iconoHombre from "@assets/icono_hombre.jpeg";
import iconoRutinFit from "@assets/iconoRutinFit.png";

const NavbarPrincipal = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  return (
    <nav className="w-full p-4 sm:p-6 mb-10 flex justify-between items-center shadow-lg bg-white z-50 relative">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <img
          src={iconoMujer}
          alt="icono-mujer"
          width={30}
          height={30}
          className="hidden sm:block"
        />
        <Link to="/" className="text-2xl sm:text-4xl font-italianno ">
          Rutin<span className="text-[#0D8894]">Fit</span>
        </Link>
        <img
          src={iconoHombre}
          alt="icono-hombre"
          width={30}
          height={30}
          className="hidden sm:block"
        />
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6 mr-2">
        <button
          className="sm:hidden flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
          </svg>
        </button>
        <div className={`sm:flex items-center ${menuOpen ? 'block' : 'hidden'} sm:static fixed top-0 left-0 w-full h-full bg-white z-50`}>
          {menuOpen && (
            <div className="flex justify-between items-center p-4">
              <img src={iconoRutinFit} alt='RutinFit' className='block sm:hidden mx-2' />
              <button
                className="text-black dark:text-white h-12 w-12 "
                onClick={() => setMenuOpen(false)}
              >
                <svg className="h-9 w-9 block sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          )}
          <ul className="w-full sm:flex sm:space-x-4 text-center">
            <li className={`mr-6 sm:mr-0 ${menuOpen ? 'mt-3' : ''}`}>
              <Link
                to="/contacto"
                className={`text-slate-700 px-4 py-2 rounded-full hover:bg-teal-600 ${menuOpen ? 'block text-left py-2 text-black hover:bg-white hover:text-[#0D9488]' : 'hover:text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                Contáctanos
              </Link>
            </li>
            <li className={`mr-6 sm:mr-0 ${menuOpen ? 'mt-3' : ''}`}>
              <Link
                to="/app"
                className={`text-slate-700 px-4 py-2 rounded-full hover:bg-teal-600 ${menuOpen ? 'block text-left py-2 text-black hover:bg-white hover:text-[#0D9488]' : 'hover:text-white'}`}
                onClick={() => setMenuOpen(false)}
              >
                App Clientes
              </Link>
            </li>
            <li className={`mr-2 sm:mr-0 ${menuOpen ? 'mt-4' : ''}`}>
              <Link
                to="/login"
                className={`bg-[#82E5B5] text-slate-700 px-4 py-2 rounded-full hover:bg-gray-900 hover:text-white ${menuOpen ? 'w-full py-4' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                ¡Empecemos!
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPrincipal;