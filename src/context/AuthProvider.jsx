import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Importar jwt-decode correctamente

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const obtenerPerfilDesdeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log("decodedToken:", decodedToken);

      //Información del usario, ya que el back no envia 
      const user = JSON.parse(localStorage.getItem("user"));

      // Actualizar el estado auth con la información del token decodificado
      setAuth({
        ...decodedToken,
        ...user
      });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const actualizarPassword = async (datos) => {
    const token = localStorage.getItem("token");
    try {
      const respuesta = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/perfil/actualizarpassword`,
        datos,
        {
          headers: {
            method: "PUT",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      obtenerPerfilDesdeToken(token);
      return { respuesta: respuesta.data.res, exito: true };
    } catch (error) {
      return { respuesta: error.response.data.res, exito: false };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) obtenerPerfilDesdeToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, actualizarPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };