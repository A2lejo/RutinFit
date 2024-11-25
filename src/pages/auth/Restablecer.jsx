import { Link } from "react-router-dom";

const Reestablecer = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<img
				className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600 mt-4"
				src=""
				alt="image description"
			/>

			<div className="flex flex-col items-center justify-center">
				<p className="md:text-lg lg:text-xl text-gray-600 mt-8">
					Ya puedes recuperar tu contraseña
				</p>
				<Link
					to={tokenBack}
					className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
				>
					Recuperar contraseña
				</Link>
			</div>
		</div>
	);
};


export default Reestablecer;	