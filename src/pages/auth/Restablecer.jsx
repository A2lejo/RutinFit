import { useParams, Link } from "react-router-dom";
import LogoEntrenador from "@assets/chatEntrenador.png";

const Reestablecer = () => {
  const { token } = useParams(); // Obtener el token desde la URL

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600 mt-4"
        src={LogoEntrenador}
        alt="Restablecer contraseña"
      />

      <div className="flex flex-col items-center justify-center">
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">
          Ya puedes recuperar tu contraseña
        </p>
        <Link
          to={`/nuevo-password/${token}`} // Usar el token obtenido desde la URL
          className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
        >
          Recuperar contraseña
        </Link>
      </div>
    </div>
  );
};

export default Reestablecer;