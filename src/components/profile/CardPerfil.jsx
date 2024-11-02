import FormularioPerfil from "./FormularioPerfil";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CardPerfil = () => {
	const navigate = useNavigate();

	// Datos de ejemplo
	const [perfil, setPerfil] = useState({
		nombre: "Alejandro",
		apellido: "Campoverde",
		edad: 22,
		telefono: "+123 456 7890",
		email: "alejandro.campoverde@example.com",
		genero: "Masculino"
	});

	const handleEdit = () => {
		navigate("/dashboard/perfil/editar");
	};

	return (
		<div
			className="bg-white border border-slate-200 h-auto p-4 
                  flex flex-col items-center justify-between shadow-custom rounded-lg "
		>
			<div className="self-start my-4">
				<h2 className="text-3xl font-serif text-[#16A39C]">{perfil.nombre} {perfil.apellido} </h2>
			</div>
			<div className="flex flex-col md:flex-row justify-between pb-7 pt-3 w-full">
				<div className="w-1/2 space-y-1">
					<div className="self-start">
						<b>Edad:</b>
						<p className="inline-block ml-3">{perfil.edad}</p>
					</div>
					<div className="self-start">
						<b>Teléfono:</b>
						<p className="inline-block ml-3">{perfil.telefono}</p>
					</div>
				</div>
				<div className="w-1/2 space-y-1">
					<div className="self-start">
						<b>Email:</b>
						<p className="inline-block ml-3">{perfil.email}</p>
					</div>
					<div className="self-start">
						<b>Genero:</b>
						<p className="inline-block ml-3">{perfil.genero}</p>
					</div>
				</div>
			</div>
			<div>
				<button
					onClick={handleEdit}
					className="bg-[#0D9488] text-black border rounded-md p-2 hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white font-serif"
				>
					Editar
				</button>
			</div>
		</div>
	);
};


export default CardPerfil;