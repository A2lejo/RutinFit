import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div
          className="hidden lg:flex lg:w-1/2 min-h-screen bg-[url('/src/assets/Login.jpg')] 
          bg-no-repeat bg-cover bg-center items-center justify-center"
        ></div>

        <div className="w-full lg:w-1/2 min-h-screen bg-white flex justify-center items-center">
          <div className="md:w-4/5 sm:w-full bg-white p-8 md:p-16 rounded-lg shadow-custom">
            <img src="/src/assets/iconoLogin.png" alt="logo" className="w-20 h-20 m-auto mb-5" />
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500 font-serif">
              BIENVENIDO
            </h1>
            <small className="text-gray-400 block my-4 text-sm font-serif">
              ¡Empezemos con el entrenamiento!
            </small>

            <form>
              <div className="mb-3">
                <label
                  className="mb-2 block text-sm font-semibold font-serif"
                  htmlFor="email"
                >
                  Correo Electrónico
                </label>
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                />
              </div>

              <div className="mb-3 font-serif">
                <label
                  className="mb-2 block text-sm font-semibold"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <input
                  required
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********************"
                  className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500"
                />
              </div>

              <div className="my-4">
                <button className="py-1.5 w-full block text-center bg-[#82E5B5] text-black border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white font-serif">
                  Iniciar Sesión
                </button>
              </div>
            </form>

            <div className="mt-3 text-sm flex justify-between items-center font-serif">
              <p>¿Olvidaste tu contraseña?</p>
              <Link
                to="/forgot"
                className="py-1 px-4 bg-[#82E5B5] text-black border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white font-serif"
              >
                Recuperala aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;