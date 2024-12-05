import React from "react";
import NotFoundImage from "../assets/NotFound.png";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img
        className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
        src={NotFoundImage}
        alt="Page Not Found"
        style={{ objectPosition: "center top" }} // Ajustar la posición de la imagen
      />
      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Acceso Denegado
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Lo sentimos, no tienes permisos para acceder a esta página.
        </p>
        <Link
          to="/"
          className="mt-8 bg-[#82E5B5] hover:bg-[#0D9488] hover:text-white  px-4 py-2 rounded-md"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;