import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Login from '@pages/auth/Login';
import Forgot from '@pages/auth/Forgot';
import Dashboard from '@pages/Dashboard';
import Perfil from '@pages/Perfil';
import FormularioPerfil from '@components/profile/FormularioPerfil';
import { AuthProvider } from './context/AuthProvider';
import AppClientes from './pages/AppClientes';
import Contacto from './pages/Contactos';

import Entrenadores from './pages/Entrenadores';
import Clientes from './pages/Clientes';
import Chat from './pages/Chat';
import Rutinas from './pages/Rutinas';
import Ejercicios from './pages/Ejercicios';

import VisualizarEntrenador from './pages/VisulizarEntrenador';
import VisualizarCliente from './pages/VisualizarClientes';
import VisualizarRutina from './pages/VisualizarRutinas';
import VisualizarEjercicios from './pages/VisualizarEjercicios';

import ActualizarEntrenador from './pages/ActualizarEntrenadores';


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/app" element={<AppClientes />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Perfil />} />
              <Route path="perfil/editar" element={<FormularioPerfil />} />
              <Route path="entrenadores" element={<Entrenadores />} />
              <Route path="entrenadores/visualizar/:id" element={<VisualizarEntrenador />} />
              <Route path="entrenadores/editar/:id" element={<ActualizarEntrenador />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="clientes/visualizar/:id" element={<VisualizarCliente />} />
              <Route path="rutinas" element={<Rutinas />} />
              <Route path="rutinas/visualizar/:id" element={<VisualizarRutina />} />
              <Route path="ejercicios" element={<Ejercicios />} />
              <Route path="ejercicios/visualizar/:id" element={<VisualizarEjercicios />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;