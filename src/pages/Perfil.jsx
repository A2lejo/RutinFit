import React from "react";
import CardPerfil from "@components/profile/CardPerfil";

const Perfil = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-5xl text-center text-[#0D9488]">Perfil</h1>
        <hr className="my-4 bg-[#82E5B5] w-3/4 mx-auto h-1" /> 
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