import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/footer/Footer.tsx";

const RouteNotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="bg-white text-gray-800 min-h-screen flex flex-col">
            <header className="bg-[#000] text-white py-10">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold">404</h1>
                    <p className="text-xl mt-2">Página não encontrada</p>
                </div>
            </header>

            <main className="flex-grow flex items-center justify-center bg-[#F3F7FF] px-4">
                <div className="text-center max-w-xl">
                    <h2 className="text-3xl font-bold text-[#000] mb-4">
                        Opa! Parece que você se perdeu.
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        A página que você está tentando acessar não existe ou foi movida.
                    </p>
                    <button
                        onClick={handleGoHome}
                        className="bg-[#000] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#003C9E] transition duration-300"
                    >
                        Voltar para a página inicial
                    </button>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default RouteNotFound;
