import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthProvider";
import { infoAlert, successUpdateAlert, errorAlert } from "@utils/AlertFunctions";
import { useNavigate } from "react-router-dom";

const FormularioPerfil = () => {
  const { auth, actualizarPerfil, obtenerPerfilEntrenador } = useContext(AuthContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    email: "",
    description: ""
  });

  useEffect(() => {
    obtenerPerfilEntrenador(); // Llama a la función para obtener el perfil del entrenador
  }, []);

  useEffect(() => {
    if (auth) {
      setForm({
        name: auth.name || "",
        lastname: auth.lastname || "",
        email: auth.email || "",
        description: auth.description || ""
      });
    }
  }, [auth]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes("")) {
      infoAlert("Todos los campos deben ser ingresados");
      return;
    }
    const resultado = await actualizarPerfil(form);
    if (resultado.exito) {
      successUpdateAlert(resultado.respuesta);
      navigate("/dashboard");
    } else {
      errorAlert(resultado.respuesta);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-serif text-[#16A39C] text-center mb-3">
        Editar Perfil
      </h2>
      <p className="text-gray-700 mb-4">
        Actualiza tus datos personales
      </p>
      <div>
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:{" "}
        </label>
        <input
          id="name"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="lastname"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Apellido:{" "}
        </label>
        <input
          id="lastname"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Apellido"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Email:{" "}
        </label>
        <input
          id="email"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          readOnly // Añadir este atributo para que el campo de email no se pueda cambiar
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Descripción:{" "}
        </label>
        <textarea
          id="description"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-[#0D9488] w-full p-3 
        text-white uppercase font-bold rounded-lg 
        hover:bg-[#82E5B5] hover:text-black cursor-pointer transition-all"
        value="Actualizar"
      />
    </form>
  );
};

export default FormularioPerfil;