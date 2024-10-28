import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white text-center">
            <div className="p-7">
                <Link to="/" className="text-3xl sm:text-6xl font-italianno">
                    Rutin<span className="text-[#82E5B5]">Fit</span>
                </Link>
                <hr className="border-[#82E5B5] my-2 mx-20" />
                <h2 className="text-2xl font-serif my-5">Redes Sociles</h2>
                <div className="flex justify-center space-x-7 p-6">
                    <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook fa-2x "></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram fa-2x"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-tiktok fa-2x"></i>
                    </a>
                </div>
                <hr className="border-[#82E5B5] my-2 mx-20" />
                <div className="p-6">
                    <h2 className="text-lg font-serif">Contáctanos:</h2>
                    <a href="mailto:contacto@rutinfit.com" className="text-sm text-[#82E5B5]">
                        contacto@rutinfit.com
                    </a>
                </div>
                <hr className="border-[#82E5B5] my-2 mx-20" />
                <div className="m-4 flex justify-between mx-8 ">
                    <p className="text-sm ml-12">© 2021 RutinFit. Todos los derechos reservados.</p>
                    <p className="text-sm mr-12">by: Alejandro Campoverde</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;