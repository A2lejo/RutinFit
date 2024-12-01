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
        ...user,
      });
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convertir a segundos

      if (decodedToken.exp < currentTime) {
        // El token ha expirado
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({});
        console.log('Token expirado, eliminado del localStorage');
      } else {
        obtenerPerfilDesdeToken(token);
      }
    }
  };

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

  const actualizarPerfil = async (form) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/coach/update-profile`,
            form,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const updatedUser = response.data.updatedUser;
        localStorage.setItem("user", JSON.stringify(updatedUser)); // Guarda el usuario actualizado en el localStorage
        setAuth(updatedUser);
        return { respuesta: 'Perfil actualizado correctamente', exito: true };
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        return { respuesta: 'Error al actualizar el perfil', exito: false };
    }
  };

  const obtenerPerfilEntrenador = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/coach/view-profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const coachProfile = response.data.coach;
      localStorage.setItem("user", JSON.stringify(coachProfile)); // Guarda el perfil del entrenador en el localStorage
      setAuth(coachProfile);
    } catch (error) {
      console.error('Error al obtener el perfil del entrenador:', error);
    }
  };

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, restorePassword, confirmTokenPassword, newPassword, updatePassword, actualizarPerfil, obtenerPerfilEntrenador }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };