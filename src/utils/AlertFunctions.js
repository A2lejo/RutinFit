import Swal from 'sweetalert2';
import { AuthContext } from "@context/AuthProvider";
import { useContext } from "react";


export const confirmDeleteAlert = async () => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: '¿Estás seguro de que quieres dar de baja?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0d9488',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  });

  return result.isConfirmed;
};

export const successLoginAlert = (message) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
  });
};

export const errorLoginAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

export const successEmail = (message) => {
  Swal.fire('Enviado', message, 'success');
}

export const successAlert = (message) => {
  Swal.fire('Eliminado', message, 'success');
};

export const successUpdateAlert = (message) => {
  Swal.fire('Actualizado', message, 'success');
};

export const errorAlert = (message) => {
  Swal.fire('Error', message, 'error');
};

export const infoAlert = (message) => {
  Swal.fire('Información', message, 'info');
};

export const warningAlert = (message) => {
  Swal.fire('Advertencia', message, 'warning');
};

export const ConfirmAlert = async (title, message, icon) => {
  const result = await Swal.fire('Agredado', message, 'success');
};

export const errorRutina = (message) => {
  const { auth } = useContext(AuthContext);
  if(auth && auth.name) {
    Swal.fire('Error', message, 'error');
  }
}

