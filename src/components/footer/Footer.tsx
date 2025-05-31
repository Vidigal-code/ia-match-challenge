import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#000] text-white py-4">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center gap-2 md:gap-4">
                <p className="text-sm md:text-base">
                    &copy; {new Date().getFullYear()} <strong>IA-MATCH!</strong> Todos os direitos reservados.
                </p>
                <a
                    href="https://github.com/Vidigal-code"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm underline hover:text-gray-300 transition-colors duration-200"
                >
                    Desenvolvido por Vidigal
                </a>
            </div>
        </footer>
    );
};

export default Footer;
