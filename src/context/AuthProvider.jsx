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

      // Información del usuario, ya que el back no envía 
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

  // const actualizarPassword = async (datos) => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const respuesta = await axios.put(
  //       `${import.meta.env.VITE_BACKEND_URL}/perfil/actualizarpassword`,
  //       datos,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     obtenerPerfilDesdeToken(token);
  //     return { respuesta: respuesta.data.res, exito: true };
  //   } catch (error) {
  //     return { respuesta: error.response.data.res, exito: false };
  //   }
  // };

  const restorePassword = async (email) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/recovery-password`,
        { email }
      );
      return response.data;
    } catch (error) {
      console.error('Error al enviar el correo de recuperación:', error);
      throw error;
    }
  };

  const confirmTokenPassword = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/users/confirm/${token}`
      );
      return response.data;
    } catch (error) {
      console.error('Error al confirmar el token:', error);
      throw error;
    }
  };

  const newPassword = async (token, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/new-password/${token}`,
        { password }
      );
      return response.data;
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error;
    }
  };

  const updatePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-password`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      obtenerPerfilDesdeToken(token);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) obtenerPerfilDesdeToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, restorePassword, confirmTokenPassword, newPassword, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };