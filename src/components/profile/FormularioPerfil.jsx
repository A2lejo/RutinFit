import { useContext, useState } from "react";
import { AuthContext } from "@context/AuthProvider";
import Alertas from "@components/Alertas";

const FormularioPerfil = () => {
  const { auth, actualizarPerfil } = useContext(AuthContext);

  const [alerta, setAlerta] = useState({});

  const [form, setform] = useState({
    id: auth._id,
    nombre: auth.nombre || "",
    apellido: auth.apellido || "",
    email: auth.email || "",
    genero: auth.genero || ""
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(form).includes("")) {
      setAlerta({
        respuesta: "Todos los campos deben ser ingresados",
        exito: false,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }
    const resultado = await actualizarPerfil(form);
    setAlerta(resultado);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit}>
      {alerta.respuesta && (
        <Alertas exito={alerta.exito}> {alerta.respuesta} </Alertas>
      )}
      <h2 className="text-3xl font-serif text-[#16A39C] text-center mb-3">
        Editar Perfil</h2>
        <p className="text-gray-700 mb-4">
          Actualiza tus datos personales
        </p>
      <div>
        <label
          htmlFor="nombre"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Nombre:{" "}
        </label>
        <input
          id="nombre"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="apellido"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Apellido:{" "}
        </label>
        <input
          id="apellido"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Apellido"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          email:{" "}
        </label>
        <input
          id="email"
          type="text"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="genero"
          className="text-gray-700 uppercase font-bold text-sm"
        >
          Género:
        </label>
        <div className="mt-2 mb-5">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="genero"
              value="Masculino"
              checked={form.genero === "Masculino"}
              onChange={handleChange}
            />
            <span className="ml-2">Masculino</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="genero"
              value="Femenino"
              checked={form.genero === "Femenino"}
              onChange={handleChange}
            />
            <span className="ml-2">Femenino</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              className="form-radio"
              name="genero"
              value="Otro"
              checked={form.genero === "Otro"}
              onChange={handleChange}
            />
            <span className="ml-2">Otro</span>
          </label>
        </div>
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