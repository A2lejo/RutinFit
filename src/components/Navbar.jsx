import React from 'react';
import { Link } from 'react-router-dom';
import iconoMujer from "@assets/icono_mujer.jpeg";
import iconoHombre from "@assets/icono_hombre.jpeg";

const Navbar = () => {
  return (
    <nav className="w-full p-2 sm:p-4 mb-2 flex justify-between items-center shadow-lg">
      <div className="flex items-center space-x-4 sm:space-x-6">
        <img
          src={iconoMujer}
          alt="icono-mujer"
          width={30}
          height={30}
          className=""
        />
        <Link to="/" className="text-2xl sm:text-4xl font-italianno">
          Rutin<span className="text-[#82E5B5]">Fit</span>
        </Link>
        <img
          src={iconoHombre}
          alt="icono-hombre"
          width={30}
          height={30}
          className=""
        />
      </div>
    </nav>
  );
};

export default Navbar;