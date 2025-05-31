import React, {useState, ChangeEvent, useEffect} from 'react';
import {
    PeoplesAffinityMatch,
    PeoplesDataMatch,
    FormDataMatch,
    logo,
    AreasDataMatch
} from "../types/Interface.ts";
import {useNavigate} from "react-router-dom";
import {getAreaDatas, getPeopleDatas} from "../api/Api.ts";
import Footer from "../components/footer/Footer.tsx";
import {findMatches} from "../types/FunctionsMatchSearch.ts";


const Match: React.FC = () => {

    const [formData, setFormData] = useState<FormDataMatch>({
        name: '',
        area: '',
        location: ''
    });

    const [matches, setMatches] = useState<PeoplesAffinityMatch[]>([]);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [PotentialPeopleResults, setPotentialPeopleResults] = useState<PeoplesDataMatch[]>([]);

    const [PotentialAreaDataResults, setPotentialAreaDataResults] = useState<AreasDataMatch[]>([]);
    const [isOpenSelectArea, setIsOpenSelectArea] = useState(false);


    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const navigate = useNavigate();

    const handleBackClickRoute = () => {
        navigate('/');
    };

    const handleSelectArea = (areaName: string) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            area: areaName,
        }));
        setIsOpenSelectArea(false);
    };

    const selectedAreaName = formData.area || '';

    useEffect(() => {
        setErrorMessage(null);
        getPeopleDatas(setPotentialPeopleResults);
        getAreaDatas(setPotentialAreaDataResults)
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">

                <header className="bg-[#000] text-white py-4 fixed top-0 w-full z-50 shadow-md">
                    <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
                        <div className="flex items-center">
                            <img src={logo.logoUrl} alt={logo.nome} className="h-8 mr-2"/>
                            <span className="text-lg font-semibold">IA-MATCH</span>
                        </div>
                        <div>
                            <button
                                onClick={handleBackClickRoute}
                                className="flex items-center bg-white text-[#000] font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#383737] hover:text-white transition"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-grow mt-[96px] flex justify-center items-start py-12 px-6">
                    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-10">

                        <div className="text-center mb-12">
                            <h1 className="text-3xl font-bold text-[#000]">Match Inteligente</h1>
                            <p className="text-gray-600 mt-2">Conexões profissionais com base em afinidade via IA</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000] focus:ring-[#000] p-3 border"
                                    placeholder="Seu nome completo"
                                />
                            </div>

                            <div>
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Área de
                                    Interesse</label>
                                <>

                                    <div>
                                        <div className="relative">

                                            <button
                                                onClick={() => setIsOpenSelectArea(!isOpenSelectArea)}
                                                className="text-left mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000] focus:ring-[#000] p-3 border"
                                            >
                                                {selectedAreaName || 'Selecione uma área'}
                                            </button>

                                            {isOpenSelectArea && (
                                                <ul
                                                    className="text-left absolute mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto z-10"
                                                    style={{top: '100%'}}
                                                >
                                                    {PotentialAreaDataResults.map((area) => (
                                                        <li
                                                            key={area.id}
                                                            onClick={() => handleSelectArea(area.area)}
                                                            className="text-left p-3 cursor-pointer hover:bg-gray-100"
                                                        >
                                                            {area.area}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="location"
                                       className="block text-sm font-medium text-gray-700">Localização</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#000] focus:ring-[#000] p-3 border"
                                    placeholder="Sua cidade"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <button
                                    type="button"
                                    onClick={() => findMatches(formData, PotentialPeopleResults,setMatches, setIsLoading, setShowResults, setErrorMessage)}
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#000] hover:bg-[#000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Buscando...
                                    </span>
                                    ) : 'Buscar Conexões'}
                                </button>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="text-center mt-6 p-4 bg-red-50 text-red-700 rounded-md">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="mt-8 flex flex-col items-center">
                                <div className="w-16 h-16 relative">
                                    <div
                                        className="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-blue-100 rounded-full"></div>
                                    <div
                                        className="absolute top-2 left-2 right-2 bottom-2 bg-white rounded-full flex items-center justify-center">
                                        <div
                                            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#000]"></div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-gray-500">
                                    Nosso algoritmo de IA está encontrando os melhores matches baseados em sua área e
                                    localização...
                                </p>
                            </div>
                        )}

                        {showResults && (
                            <div className="mt-12">
                                <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">Conexões
                                    encontradas</h2>
                                {matches.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {matches.map((match) => (
                                            <div key={match.id}
                                                 className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-3">
                                                        <h3 className="font-semibold text-gray-900 text-lg">{match.name}</h3>
                                                        <div
                                                            className="flex items-center justify-center bg-[#000] text-white font-bold rounded-full h-12 w-12 border-2 border-[#000]">
                                                            {match.affinity}%
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mb-3">{match.area} • {match.location}</p>
                                                    <p className="text-sm text-gray-600">{match.description}</p>
                                                    <div className="mt-4 flex justify-center items-center">
                                                        <button
                                                            className="text-[#000] font-semibold px-3 py-1.5 rounded-lg border-2 border-[#000] hover:bg-[#000] hover:text-white transition duration-300 text-sm">
                                                            Conectar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <p className="mt-4 text-gray-500">Nenhuma conexão encontrada. Tente outros
                                            critérios.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-500">
                                Este é um MVP simulado para o desafio de desenvolvimento IA-MATCH!
                            </p>
                        </div>
                    </div>
                </main>

                <Footer/>
            </div>
        </>
    );


};

export default Match;