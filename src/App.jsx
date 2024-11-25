import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@context/AuthProvider';
import { RutinasProvider } from '@context/RutinasProvider';
import Home from './pages/Home';
import Contacto from './pages/Contactos';
import AppClientes from './pages/AppClientes';
import Login from './pages/auth/Login';
import Forgot from './pages/auth/Forgot';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/Perfil';
import FormularioPerfil from './components/profile/FormularioPerfil';
import NotFound from './pages/NotFound';
import Restablecer from './pages/auth/Restablecer';

import Entrenadores from './pages/Entrenadores';
import RegistrarEntrenador from './pages/RegistrarEntrenador';
import VisualizarEntrenador from './pages/VisualizarEntrenador';
import ActualizarEntrenador from './pages/ActualizarEntrenador';

import Clientes from './pages/Clientes';
import VisualizarCliente from './pages/VisualizarCliente';

import Chat from './pages/Chat';

import VisualizarRutina from './pages/VisualizarRutina';

import VisualizarEjercicios from './pages/VisualizarEjercicios';


function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <RutinasProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/app" element={<AppClientes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/recovery/:token" element={<Restablecer />} />
              <Route path="*" element={<NotFound/>} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<Perfil />} />
                <Route path="perfil/editar" element={<FormularioPerfil />} />
                <Route path="entrenadores" element={<Entrenadores />} />
                <Route path="entrenadores/registrar" element={<RegistrarEntrenador />} />
                <Route path="entrenadores/visualizar/:id" element={<VisualizarEntrenador />} />
                <Route path="entrenadores/editar/:id" element={<ActualizarEntrenador />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="clientes/visualizar/:id" element={<VisualizarCliente />} />
                <Route path="rutinas/:id" element={<VisualizarRutina />} />
                <Route path="ejercicios/:id" element={<VisualizarEjercicios />} />
                <Route path="chat" element={<Chat/>} />
              </Route>
            </Routes>
          </RutinasProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;