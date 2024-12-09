import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const perfil = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const decodedToken = jwtDecode(token);
      setAuth({...decodedToken, ...response.data });
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuth({});
      navigate("/login");
    }
  };

  const obtenerPerfilDesdeToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      perfil();      
    }
  }, []);

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
      setAuth({...updatedUser, ...jwtDecode(token)}); // Actualiza el estado auth con el usuario actualizado
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
      localStorage.setItem("user", JSON.stringify(coachProfile));
      setAuth({...coachProfile, ...jwtDecode(token)});
    } catch (error) {
      console.error('Error al obtener el perfil del entrenador:', error);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.res) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({});
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, restorePassword, confirmTokenPassword, newPassword, updatePassword, actualizarPerfil, obtenerPerfilEntrenador, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };