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
          </Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;