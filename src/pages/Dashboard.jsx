import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { AuthContext } from "@context/AuthProvider";
import IconoEntrenador from "@assets/IconoEntrenador.png";
import IconoUsuario from "@assets/IconoUsuario.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const urlActual = location.pathname;
  const { auth } = useContext(AuthContext);
  const [rol, setRol] = useState("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    console.log("Auth State:", auth); // Agregar console.log para ver el estado auth
    if (auth && auth.name) {
      setRol(auth.rol);
      setNombre(auth.name);
    }
  }, [auth]);

  useEffect(() => {
    const logout = (event) => {
      if (event.key === "logout") {
        navigate("/login");
      }
    };
    window.addEventListener("storage", logout);
    return () => { window.removeEventListener("storage", logout); };
  }, [navigate]);

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/5 bg-black px-5 py-4">
        <Link to="/">
          <h2 className="text-4xl font-black text-center text-slate-200 font-italianno">
            Rutin<span className="text-[#83E5B5]">Fit</span>
          </h2>
        </Link>
        <img
          src={IconoEntrenador}
          alt="img-client"
          className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full"
          width={120}
          height={120}
        />
        <p className="text-slate-400 text-center my-4 text-sm">
          {" "}
          <span className="bg-green-600 w-3 h-3 inline-block rounded-full"></span>{" "}
          Bienvenido - {nombre}
          <br />
          Rol - {rol}
        </p>

        <hr className="mt-5 border-slate-500" />

        <ul className="mt-5">
          {(rol === "administrador" || rol === "entrenador") && (
            <li className="text-center">
              <Link
                to="/dashboard"
                className={`${urlActual === "/dashboard"
                  ? "text-black bg-[#16A39C] rounded-md text-center scale-105"
                  : "text-slate-600"
                  } px-3 py-2 text-xl block mt-2 hover:bg-[#82E5B5]`}
              >
                Perfil
              </Link>
            </li>
          )}

          {rol === "administrador" && (
            <li className="text-center">
              <Link
                to="/dashboard/entrenadores"
                className={`${urlActual === "/dashboard/entrenadores"
                  ? "text-black bg-[#16A39C] rounded-md text-center scale-105"
                  : "text-slate-600"
                  } px-3 py-2 text-xl block mt-2 hover:bg-[#82E5B5]`}
              >
                Entrenadores
              </Link>
            </li>
          )}

          {(rol === "administrador" || rol === "entrenador") && (
            <li className="text-center">
              <Link
                to="/dashboard/clientes"
                className={`${urlActual === "/dashboard/clientes"
                  ? "text-black bg-[#16A39C] rounded-md text-center scale-105"
                  : "text-slate-600"
                  } px-3 py-2 text-xl block mt-2 hover:bg-[#82E5B5]`}
              >
                Clientes
              </Link>
            </li>
          )}

          {rol === "entrenador" && (
            <li className="text-center">
              <Link
                to="/dashboard/chat"
                className={`${urlActual === "/dashboard/chat"
                  ? "text-black bg-[#16A39C] rounded-md text-center scale-105"
                  : "text-slate-600"
                  } px-3 py-2 text-xl block mt-2 hover:bg-[#82E5B5]`}
              >
                Chat
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="flex-1 flex flex-col justify-between h-screen bg-gray-100">
        <div className="bg-black py-2 flex md:justify-end items-center gap-5 justify-center">
          <div className="text-md font-semibold text-slate-100">
            Usuario - {nombre}
          </div>
          <div>
            <img
              src={IconoUsuario}
              alt="img-client"
              className="border-2 border-green-600 rounded-full"
              width={50}
              height={50}
            />
          </div>
          <div>
            <Link
              to="/"
              className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setAuth({});
                localStorage.setItem("logout", Date.now());
              }}
            >
              Salir
            </Link>
          </div>
        </div>
        <div className="overflow-y-scroll p-8">
          {auth ? <Outlet /> : <Navigate to="/login" />}
        </div>
        <div className="bg-black h-12">
          <p className="text-center text-slate-100 leading-[2.9rem] underline">
            © 2024 RutinFit. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;