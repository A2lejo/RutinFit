import { Link } from "react-router-dom";

const Forgot = () => {
	return (
		<>
			<div className="flex flex-col lg:flex-row min-h-screen">
				<div className="w-full lg:w-1/2 min-h-screen bg-white flex flex-col justify-center items-center">
					<div className="md:w-4/5 sm:w-full mt-4 bg-white p-8 md:p-16 rounded-lg shadow-custom">
						<img src="/src/assets/iconoForgot.jpg" alt="logo" className="w-20 h-20 m-auto mb-5" />
						<h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500 font-serif">
							Recupera tu contraseña
						</h1>
						<small className="text-gray-400 block my-4 text-sm font-serif">
							No te preocupes, te enviaremos un correo para que puedas recuperar tu contraseña
						</small>

						<form>
							<div className="mb-1">
								<label
									className="mb-2 block text-sm font-semibold"
									htmlFor="email"
								>
									Correo Electrónico
								</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="Ingresa tu correo"
									className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
								/>
							</div>

							<div className="mb-3">
								<button className="bg-[#82E5B5] text-black border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white font-serif">
									Enviar correo
								</button>
							</div>
						</form>

						<div className="mt-5 text-xs border-b-2 py-4 "></div>

						<div className="mt-3 text-sm flex justify-between items-center font-serif">
							<p>¿Lo acabas de recordar?</p>
							<Link
								to="/login"
								className="py-2 px-5 bg-[#82E5B5] text-black border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white font-serif"
							>
								Login
							</Link>
						</div>
					</div>
				</div>

				<div
					className="w-full lg:w-1/2 min-h-screen bg-[url('/src/assets/forgot.jpg')] 
          bg-no-repeat bg-cover bg-center flex items-center justify-center"
				></div>
			</div>
		</>
	);
};

export default Forgot;