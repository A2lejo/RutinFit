import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { AuthContext } from "@context/AuthProvider";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`.replace("/api", ""));

const Chat = () => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const { auth } = useContext(AuthContext);

  const listarClientes = async () => {
    try {
      const respuesta = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/coach/get-clients`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Clientes:', respuesta.data);
      setClientes(respuesta.data);
    } catch (error) {
      console.error('Error al listar clientes:', error);
    }
  };

  

  useEffect(() => {
    listarClientes();

    socket.on("receive", (mensaje) => {
      if (mensaje.emisor === clienteSeleccionado || mensaje.receptor === clienteSeleccionado) {
        setMensajes((state) => [...state, mensaje]);
      }

      // Agregar cliente a la lista si no está ya
      if (!clientes.some(cliente => cliente._id === mensaje.emisor)) {
        setClientes((prevClientes) => [
          ...prevClientes,
          { _id: mensaje.emisor, user_id: { name: mensaje.nombre, lastname: "" } } // Ajusta según los datos disponibles
        ]);
      }
    });

    return () => socket.disconnect();
  }, [clienteSeleccionado]);

  const handleMensajeChat = () => {
    if (mensaje.trim() && clienteSeleccionado) {
      const newMessage = {
        mensaje,
        emisor: auth._id,
        receptor: clienteSeleccionado,
        nombre: auth.nombre,
        rol: auth.rol,
        createdAt: Date.now(),
      };

      setMensajes((prevMensajes) => [...prevMensajes, newMessage]);
      socket.emit("send", newMessage);
      setMensaje("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[70vh]">
      <div className="md:w-1/4 bg-gray-100 p-4 border-r-2 border-[#0D8894]">
        <h2 className="text-2xl font-bold mb-4 text-[#0D8894]">Clientes</h2>
        <ul>
          {clientes.length === 0 ? (
            <li>No hay clientes disponibles</li>
          ) : (
            clientes.map((cliente) => {
              console.log('Cliente:', cliente); // Verifica los datos del cliente
              return (
                <li
                  key={cliente._id}
                  className={`p-2 cursor-pointer border-2 border-[#0D8894] mb-1 rounded-md ${clienteSeleccionado === cliente._id ? "bg-blue-200" : ""}`}
                  onClick={() => {
                    setClienteSeleccionado(cliente._id);
                    setMensajes([]); // Limpiar mensajes al seleccionar un nuevo cliente
                  }}
                >
                  {cliente.user_id.name} {cliente.user_id.lastname}
                </li>
              );
            })
          )}
        </ul>
      </div>
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          <div className="chat-message">
            {mensajes.map(
              ({ mensaje, emisor, nombre, rol, createdAt }, index) =>
                emisor === auth._id ? (
                  <div key={index} className="flex items-end justify-end my-2">
                    <div className="flex flex-col items-end">
                      <span className="text-xs mr-2.5">{nombre}</span>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-700 text-white text-xs max-w-xs mx-2 break-words">
                        {mensaje}
                      </span>
                      <span className="text-xs mr-2.5 mt-1 text-neutral-500">
                        {new Date(createdAt).toLocaleString()}
                      </span>
                    </div>
                    <img
                      src={
                        rol === "entrenador"
                          ? "https://cdn-icons-png.flaticon.com/128/11837/11837612.png"
                          : "https://cdn-icons-png.flaticon.com/128/11053/11053973.png"
                      }
                      alt="Profile"
                      className="w-14 h-14 rounded-full order-2"
                    />
                  </div>
                ) : (
                  <div className="flex items-end my-2" key={index}>
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                      <div className="flex flex-col items-start">
                        <span className="text-xs ml-1">{nombre}</span>
                        <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-300 text-gray-600">
                          {mensaje}
                        </span>
                        <span className="text-xs ml-1 mt-1 text-neutral-500">
                          {new Date(createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <img
                      src={
                        rol === "entrenador"
                          ? "https://cdn-icons-png.flaticon.com/512/2934/2934749.png"
                          : "https://cdn-icons-png.flaticon.com/512/2105/2105138.png"
                      }
                      alt="Profile"
                      className="w-14 h-14 rounded-full order-1"
                    />
                  </div>
                )
            )}
          </div>
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex items-center">
            <textarea
              placeholder="Escribe tu mensaje!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3 resize-none "
              value={mensaje}
              onChange={({ target }) => setMensaje(target.value)}
              rows="1"
              style={{ height: 'auto', overflowY: 'hidden' }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-[#0D8894] hover:bg-green-600 focus:outline-none"
              onClick={handleMensajeChat}
            >
              <span className="font-bold">Enviar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;