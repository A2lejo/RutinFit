import React from "react";
import CardPerfil from "@components/profile/CardPerfil";

const Perfil = () => {
  return (
    <>
      <div>
        <h1 className="font-serif text-4xl text-black">Perfil</h1>
        <hr className="my-4" />
        <p className="mb-8 font-serif">
          Bienvenido a tu perfil
        </p>
      </div>

      <div className="flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap">
        <div className="w-full md:w-full">
          <CardPerfil />
        </div>
      </div>
    </>
  );
};

export default Perfil;