import {useNavigate} from 'react-router-dom';
import {FeatureCardPropsLandingPage, logo} from "../types/Interface.ts";
import Footer from "../components/footer/Footer.tsx";
import React from "react";

const LandingPage: React.FC = () => {


    const navigate = useNavigate();

    const handleStartClickRoute = () => {
        navigate('/match');
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-white text-gray-800">
            <header className="bg-[#000] text-white">
                <div className="max-w-7xl mx-auto px-4 py-20 text-center animate-fade-in">
                    <div className="flex justify-center mb-8">
                        <img
                            src={logo.logoUrl}
                            alt={logo.nome}
                            className="h-20"
                        />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Match Inteligente</h1>
                    <p className="text-lg sm:text-xl max-w-2xl mx-auto">
                        Conexões profissionais com base em afinidade via Inteligência Artificial
                    </p>
                    <div className="mt-8">
                        <button
                            onClick={handleStartClickRoute}
                            className="bg-white text-[#000] font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#383737] hover:text-white transition duration-300"
                        >
                            Começar agora
                        </button>
                    </div>
                </div>
            </header>

            <section className="py-16 bg-[#F3F7FF]">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-[#000] mb-10">Por que usar o Match Inteligente?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            title="IA de Afinidade"
                            description="Nosso algoritmo analisa seus interesses e localização para encontrar os melhores pares profissionais."
                        />
                        <FeatureCard
                            title="Foco Profissional"
                            description="Ideal para networking de qualidade em áreas como Tecnologia, Direito, Consultoria e mais."
                        />
                        <FeatureCard
                            title="Rápido e Eficiente"
                            description="Basta preencher o formulário e nosso sistema encontra conexões em segundos."
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-[#000] mb-10">Como funciona?</h2>
                    <ol className="space-y-6 text-center max-w-2xl mx-auto text-gray-700 text-lg list-decimal list-inside">
                        <li>Preencha seu nome, área de interesse e localização.</li>
                        <li>Nosso algoritmo identifica perfis com maior afinidade.</li>
                        <li>Visualize os melhores matches e conecte-se!</li>
                    </ol>
                </div>
            </section>

            <section className="py-16 bg-[#DCE9FF] flex items-center justify-center">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-semibold text-[#000] mb-4">
                        Pronto para se conectar com os melhores?
                    </h2>
                    <p className="mb-6 text-gray-700">
                        Clique abaixo para acessar o formulário e começar sua jornada!
                    </p>
                    <button
                        onClick={handleStartClickRoute}
                        className="bg-[#000] text-white font-semibold px-9 py-3 rounded-lg shadow hover:bg-[#383737] hover:text-white transition duration-300"
                    >
                        Acessar Formulário
                    </button>
                </div>
            </section>

            <Footer/>
        </div>
    );

};


const FeatureCard = ({title, description}: FeatureCardPropsLandingPage) => (
    <div
        className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-semibold text-[#000] mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);


export default LandingPage;
