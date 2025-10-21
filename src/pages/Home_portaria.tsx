import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

export default function HomePortaria() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA]'>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">Bom dia, Maria Silva</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Portaria</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]">Segunda-feira, 18 de Setembro de 2025</h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">

            {/* Primeira linha de botões */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Plus.png" alt="Encomendas" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Encomendas</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Account Male.png" alt="Cadastrar Visitante" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Cadastrar Visitantes</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../EyeRoxo.png" alt="Ultimos Acessos" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Ultimos Acessos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Busca de Morador*/}
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-0 shadow-lg flex flex-col gap-4 md:gap-6 overflow-hidden">

            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Busca de Morador
              </h1>
              <form className="w-full md:max-w-xs">
                <label htmlFor="search-resident" className="sr-only">
                  Buscar
                </label>
                <div className="relative">
                  <input type="search" id="search-resident" className="block w-full p-2.5 pl-4 pr-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-400 focus:border-blue-400 placeholder-gray-500 shadow-inner transition duration-150 ease-in-out" placeholder="Buscar..." required />
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
              </form>
            </div>

            <div className="px-6 pb-6 md:px-10 md:pb-10">
              <div className="w-full relative">
                <div className="h-24 md:h-28 bg-gradient-to-r from-[#5e5ced] to-[#572486] px-6 py-6 flex items-center justify-between text-white rounded-t-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50">
                      <svg className="w-8 h-8 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold">
                      Rodrigo Tavares {/* Puxar o Nome do morador*/}
                    </h2>
                  </div>
                  <span className="text-lg md:text-xl font-semibold opacity-90">
                    Casa 230
                  </span>
                </div>

                <div className="bg-white rounded-b-xl shadow-xl p-6 md:p-8 relative z-10 mt-[-20px] mx-4 border border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Coluna CPF */}
                    <div className="flex flex-col gap-2">
                      {/* Título com Ícone */}
                      <div className="flex items-center text-gray-700 font-bold text-base">
                        {/* Ícone do Documento */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                        CPF
                      </div>
                      {/* Valor em um Card Flutuante */}
                      <div className="flex items-center bg-white rounded-lg shadow-md p-3 border border-gray-100 w-full md:w-auto">
                        {/* Ícone menor no card de valor */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                        <span className="text-gray-800 font-mono text-base">
                          ***.***.***-**
                        </span>
                      </div>
                    </div>

                    {/* Coluna Placa do Veículo */}
                    <div className="flex flex-col gap-2">
                      {/* Título com Ícone */}
                      <div className="flex items-center text-gray-700 font-bold text-base">
                        {/* Ícone do Veículo */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1.4C18.6 11.2 17.4 10 16 10H8c-1.4 0-2.6 1.2-3.6 2h-1.4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        Placa do Veículo
                      </div>
                      <div className="flex items-center bg-white rounded-lg shadow-md p-3 border border-gray-100 w-full md:w-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1.4C18.6 11.2 17.4 10 16 10H8c-1.4 0-2.6 1.2-3.6 2h-1.4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        <span className="text-gray-800 font-medium">
                          IYX-3D58
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <h3 className="font-bold text-gray-700 mb-2">Outros moradores:</h3>
                    <ul className="text-gray-600 text-sm flex flex-wrap gap-x-4 gap-y-1 list-none p-0">
                      <li>• João Silva</li>
                      <li>• Nicole Moreira</li>
                      <li>• Mariana Silva</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}