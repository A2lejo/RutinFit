import Swal from 'sweetalert2';

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

export const successAlert = (message) => {
  Swal.fire('Eliminado', message, 'success');
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
