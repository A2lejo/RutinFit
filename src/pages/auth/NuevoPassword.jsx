import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alertas from "@components/Alertas";
import { useParams } from "react-router-dom";
import logoPassword from "@assets/chatUsuario.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { successUpdateAlert, errorAlert } from "@utils/AlertFunctions";

const NuevoPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [alerta, setAlerta] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      errorAlert("Las contraseñas no coinciden");
      return;
    }
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/new-password/${token}`;
      const respuesta = await axios.post(url, { password: form.password, confirmPassword: form.confirmPassword });
      setForm({ password: "", confirmPassword: "" });
      successUpdateAlert(respuesta.data.res);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setAlerta({ respuesta: error.response.data.res, exito: false });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {alerta.respuesta && (
        <Alertas exito={alerta.exito}>{alerta.respuesta}</Alertas>
      )}
      <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500 mt-4">
        Bienvenido
      </h1>
      <small className="text-gray-400 block my-4 text-sm">
        Ingresa tus datos
      </small>
      <img
        className="object-cover h-40 w-40 rounded-full border-4 border-solid border-slate-600"
        src={logoPassword}
        alt="image description"
      />
      <form className="w-full max-w-md mt-8" onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label className="mb-2 block text-sm font-semibold">
            Contraseña
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
            value={form.password}
            name="password"
            onChange={handleChange}
          />
          <div
            className="absolute inset-y-12 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="mb-2 block text-sm font-semibold">
            Confirma tu contraseña
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repeat your password"
            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-2 px-3 text-gray-500"
            value={form.confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          <div
            className="absolute inset-y-12 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <div className="mb-3">
          <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default NuevoPassword;