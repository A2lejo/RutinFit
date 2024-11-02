import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Chat</h1>
      <div className="bg-white shadow-custom rounded-lg p-6 mb-6">
        <div className="h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="text-gray-700">{msg}</span>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          className="border-2 w-full p-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button
          type="submit"
          className="bg-[#82E5B5] text-black px-4 py-2 rounded-md hover:bg-teal-600 hover:text-white ml-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Chat;