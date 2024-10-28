import FormularioPerfil from "./FormularioPerfil";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CardPerfil = () => {
	const navigate = useNavigate();

	const handleEdit = () => {
		navigate("/dashboard/perfil/editar");
	};

	return (
		<div
			className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg"
		>
			<div>
				<img
					src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
					alt="img-client"
					className="m-auto "
					width={120}
					height={120}
				/>
			</div>
			<div className="self-start">
				<b>Nombre:</b>
				<p className="inline-block ml-3"></p>
			</div>
			<div className="self-start">
				<b>Apellido:</b>
				<p className="inline-block ml-3"></p>
			</div>
			<div className="self-start">
				<b>Dirección:</b>
				<p className="inline-block ml-3"></p>
			</div>
			<div className="self-start">
				<b>Teléfono:</b>
				<p className="inline-block ml-3"></p>
			</div>
			<div className="self-start">
				<b>Email:</b>
				<p className="inline-block ml-3"></p>
			</div>
			<div>
				<button
					onClick={handleEdit}
					className="bg-[#82E5B5] text-black border rounded-md p-2 hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white font-serif">
					Editar
				</button>
			</div>
		</div>
	);
};


export default CardPerfil;