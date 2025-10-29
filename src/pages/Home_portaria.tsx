import React, { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';
import ModalCad from '../Components/Modal_CadastrarVis';

export default function HomePortaria() {

  const [isVisitanteModalOpen, setIsVisitanteModalOpen] = useState(false);

  const handleOpenVisitanteModal = () => setIsVisitanteModalOpen(true);
  const handleCloseVisitanteModal = () => setIsVisitanteModalOpen(false);

  return (
    <>
      <header>
        <Header />
      </header>

      <ModalCad
        isOpen={isVisitanteModalOpen}
        onClose={handleCloseVisitanteModal}
      />

      <main className='bg-[#EAEAEA]'>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">Bom dia, Maria Silva</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Portaria</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]"><DataAtual></DataAtual></h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-8 mb-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">
            {/* Primeira linha de botões */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">

              {/* Botão Encomendas */}
              <a href="/encomendas">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="Encomendas" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Encomendas</span>
                </button>
              </a>

              {/* Botão Cadastrar Visitantes*/}
              <button
                onClick={handleOpenVisitanteModal}
                className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                <img src="../Account Male.png" alt="Cadastrar Visitante" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Cadastrar Visitantes</span>
              </button>

              {/* Botão Ultimos Acessos */}
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../EyeRoxo.png" alt="Ultimos Acessos" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Ultimos Acessos</span>
              </button>
            </div>
          </div>
        </div>

        {/* Seção de Busca de Morador*/}
        <div className="flex flex-col items-center justify-center p-4 md:p-8 mb-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-0 shadow-lg flex flex-col gap-4 md:gap-6 overflow-hidden">

            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Busca de Morador
              </h1>
              <form className="w-full md:max-w-sm">
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
                          IYX-3D58 {/* Puxar A Placa do carro do morador*/}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Lista de Familiares que Mora com Morador*/}
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

        <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-20 py-16 px-4">
          {/* Card 1: Visitantes Recentes */}
          <div className="w-full md:w-[490px] h-auto bg-white rounded-[10px] shadow-xl flex-shrink-0 p-6">
            <div className="flex justify-between flex-row items-center border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl font-medium px-4 pt-4">Visitantes recentes</h1>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-4 mt-4">
                <h1 className="text-blue-700">12 pessoas</h1>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img src="URL_DA_IMAGEM_AQUI" className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition">
                    Dentro
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition">
                    Saiu
                  </button>
                </div>
              </div>

              {/* Item de Visitante Recente*/}
              <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img src="URL_DA_IMAGEM_AQUI" className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition">
                    Dentro
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition">
                    Saiu
                  </button>
                </div>
              </div>

              {/* Item de Visitante Recente*/}
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img src="URL_DA_IMAGEM_AQUI" className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-blue-700 bg-blue-100 hover:bg-blue-200 transition">
                    Dentro
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 transition">
                    Saiu
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Visitantes Esperados */}
          <div className="w-full md:w-[490px] h-auto bg-white rounded-[10px] shadow-xl flex-shrink-0 p-6">
            <div className="flex justify-between flex-row items-center border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl font-medium px-4 pt-4">Visitantes Esperados</h1>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 mr-4 mt-4">Ver agenda</a>
            </div>

            {/* Lista de Visitantes Esperados */}
            <div className="flex flex-col space-y-4">
              {/* Item de Visitante Esperado (Status: Chegando) */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img
                    src="URL_DA_IMAGEM_AQUI"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-3 py-1 text-sm font-medium rounded-full text-yellow-800 bg-yellow-100">
                    Chegando
                  </div>
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
              </div>

              {/* Item de Visitante Esperado (Status: Confirmado 1) */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img src="URL_DA_IMAGEM_AQUI" className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div>
                  <div className="px-3 py-1 text-sm font-medium rounded-full text-blue-800 bg-blue-100">
                    Confirmado
                  </div>
                </div>
              </div>

              {/* Item de Visitante Esperado (Status: Confirmado 2) */}
              <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center space-x-3">
                  {/* Atuailizar com a imagem de perfil da pessoa*/}
                  <img src="URL_DA_IMAGEM_AQUI" className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-900">Maria da Graça de Lourdes</p>
                    <p className="text-sm text-gray-500">Casa 89 · Técnica de TV</p>
                    <p className="text-xs text-gray-400">Agendado para 09:30</p> {/* Atualizar com a Hora */}
                  </div>
                </div>
                <div>
                  <div className="px-3 py-1 text-sm font-medium rounded-full text-blue-800 bg-blue-100">
                    Confirmado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Log de Atividades*/}
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] h-auto rounded-xl flex flex-col gap-4 md:gap-6">
            <div className="bg-white rounded-[10px] shadow-xl p-0 md:p-6 w-full max-w-full">
              <div className="flex justify-between items-center px-4 py-4">
                <h1 className="text-2xl font-medium text-gray-900">Log de Atividades</h1>
                <div className="flex items-center space-x-4">
                  <select
                    className="border border-gray-300 rounded-md py-1.5 pl-3 pr-10 text-sm focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="24h"
                  >
                    <option value="24h">Últimas 24h</option>
                    <option value="7d">Últimos 7 dias</option>
                    <option value="30d">Últimos 30 dias</option>
                  </select>

                  {/* Botão Exportar */}
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Exportar
                  </button>
                </div>
              </div>

              <ul className="divide-y divide-gray-100">
                <li className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></div>
                    <span className="text-base text-gray-800">
                      <span className="font-medium">Visitante autorizado</span> - Maria da Graça de Lourdes para Casa 89
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">08:45</span> {/* Atualizar com a Hora */}
                </li>

                <li className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></div>
                    <span className="text-base text-gray-800">
                      <span className="font-medium">Encomenda registrada</span> - Casa 245 (2 volumes)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">08:30</span> {/* Atualizar com a Hora */}
                </li>

                <li className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-purple-500 flex-shrink-0"></div>
                    <span className="text-base text-gray-800">
                      <span className="font-medium">Entrega realizada</span> - Casa 102 (João Santos)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">08:13</span>
                </li>

                <li className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition duration-150">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"></div>
                    <span className="text-base text-gray-800">
                      <span className="font-medium">Início do turno</span> - João Silva (Porteiro)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-mono">06:00</span> {/* Atualizar com a Hora */}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Seção de Contatos de Emergência */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-0 shadow-lg flex flex-col gap-4 md:gap-6 overflow-hidden">
            <div className="px-4 py-4 md:px-6 md:py-4 border-b border-gray-200">
              <h1 className="text-xl md:text-2xl font-medium text-gray-900">
                Contatos de Emergência
              </h1>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6 pt-0 md:pt-0">
              <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 transform hover:scale-[1.01] bg-[#fecaca] h-40">
                <div className="mb-2">
                  <img src="./ShieldVermelho.png" alt="Ícone de Segurança" className="w-10 h-10 text-white" />
                </div>
                <span className="text-lg font-semibold text-center text-[#b91c1c] mt-2">
                  Segurança
                </span>
                <span className="text-base text-center font-medium opacity-90 text-[#b91c1c] mt-1">
                  (11) 9999-0001
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 transform hover:scale-[1.01] bg-[#bfdbfe] h-40">
                <div className="mb-2">
                  <img src="./Manager.png" alt="Ícone de Síndico" className="w-10 h-10 text-white" />
                </div>
                <span className="text-lg font-semibold text-center text-[#2563eb] mt-2">
                  Síndico
                </span>
                <span className="text-base text-center font-medium opacity-90 text-[#2563eb] mt-1">
                  (11) 9999-0002
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 transform hover:scale-[1.01] bg-[#d9f99d] h-40">
                <div className="mb-2">
                  <img src="./Maintenance.png" alt="Ícone de Manutenção" className="w-10 h-10 text-white" />
                </div>
                <span className="text-lg font-semibold text-center text-[#65a30d] mt-2">
                  Manutenção
                </span>
                <span className="text-base text-center font-medium opacity-90 text-[#65a30d] mt-1">
                  (11) 9999-0003
                </span>
              </div>

              <div className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition duration-300 transform hover:scale-[1.01] bg-[#e9d5ff] h-40">
                <div className="mb-2">
                  <img src="./Businesswoman.png" alt="Ícone de Zeladora" className="w-10 h-10 text-white" />
                </div>
                <span className="text-lg font-semibold text-center text-[#9333ea] mt-2">
                  Zeladora
                </span>
                <span className="text-base text-center font-medium opacity-90 text-[#9333ea] mt-1">
                  (11) 9999-0004
                </span>
              </div>

            </div>
          </div>
        </div>
      </main >

      <footer>
        <Footer />
      </footer>

    </>
  );
}