import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@context/AuthProvider";
import Alertas from "@components/Alertas";

const FormularioPerfil = () => {
  const { auth, actualizarPerfil } = useContext(AuthContext);

  const [alerta, setAlerta] = useState({});

  const [form, setForm] = useState({
    id: "",
    name: "",
    lastname: "",
    email: ""
  });

  useEffect(() => {
    console.log("auth en FormularioPerfil:", auth);
    if (auth) {
      setForm({
        id: auth.id,
        name: auth.name || "",
        lastname: auth.lastname || "",
        email: auth.email || ""
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
      setAlerta({
        respuesta: "Todos los campos deben ser ingresados",
        exito: false,
      });
      setTimeout(() => {
        setAlerta({});
      }, 5000);
      return;
    }
    console.log("datos a enviar:", form);
    const resultado = await actualizarPerfil(form);
    console.log("resultado:", resultado);
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