import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';

export default function Manutencao() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA] min-h-screen'>
        {/*Botões de Navegação*/}
        <div className='bg-white flex justify-center items-center py-4 space-x-6 shadow-md'>
          <a href="/admin">
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
            <img className="mr-2 h-5 w-5" src="./Home.png" alt="" />
            Inicio
          </button>
          </a>
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
            <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="" />
            Comunicação
          </button>
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
            <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="" />
            Votação
          </button>
        </div>

        {/*Card Inicial (boas Vindas)*/}
        <div className="bg-white flex flex-col items-center justify-center py-8 md:py-10 shadow-lg">
          <div className="flex items-center justify-start w-[90%] max-w-[2300px] h-auto min-h-[160px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-2xl p-6 md:p-12 shadow-xl"> {/* Aumentei w para 90% e padding */}
            <div className="flex flex-col items-start text-white space-y-2 md:space-y-3">
              <h1 className="text-2xl md:text-4xl font-semibold leading-tight m-0">Bom dia, Ema</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-xl opacity-90 m-0">Seja bem-vindo(a) ao painel da Zeladoria</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-8 md:w-8" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-xl ml-2 md:ml-3"><DataAtual></DataAtual></h1> 
              </div>
            </div>
          </div>
        </div>
        
        {/*Cards de Status*/}
        <div className='mx-auto w-[90%] max-w-[2300px] mt-8'>
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Sugestãos Pendentes</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>8</h1>
                  <div className='bg-blue-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Light.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Up Arrow.png" alt="" />
                  <h1 className="text-sm text-green-600 font-medium">+12% Esta semana</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Manutenção Ativa</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>4</h1>
                  <div className='bg-orange-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Tools.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Clock.png" alt="" />
                  <h1 className="text-sm text-orange-600 font-medium">2 Urgentes</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Manutenção Concluída</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>6</h1>
                  <div className='bg-green-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Check Mark.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./DoneVerdeEscuro.png" alt="" />
                  <h1 className="text-sm text-green-600 font-medium">Meta Atingida</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Moradores Ativos</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>127</h1>
                  <div className='bg-purple-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./BuildingRoxo.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Users.png" alt="" />
                  <h1 className="text-sm text-purple-600 font-medium">80% Participação</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          SEÇÃO 4: SUGESTÕES RECENTES E TAREFAS PRIORITÁRIAS
          Aumentei a margem superior (mt) e padding de toda a seção, e o espaçamento (gap) entre as colunas.
        */}
        <div className="flex justify-center items-start px-4 md:px-6 mt-8 pb-4"> {/* Aumentei mt para 8 */}
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-8 w-full max-w-[2300px]"> {/* Aumentei o gap entre as colunas */}

            {/* Div Sugestão Recentes */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col"> {/* Aumentei o padding */}
              <div className='flex justify-between items-center mb-6 border-b pb-4 border-gray-200'> {/* Aumentei pb */}
                <div className='flex items-center gap-2'> {/* Aumentei o gap */}
                  <img className="h-7 w-7" src="./Chat.png" alt="Ícone de chat" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Sugestões Recentes
                  </h1>
                </div>
                <div className='flex items-center gap-1'>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    Ver Todas
                  </a>
                  <img className='h-4 w-4' src="./Right.png" alt="Seta para a direita" />
                </div>
              </div>

              {/* Cards de Sugestão */}
              <div className="flex flex-col space-y-4"> {/* Mantive space-y-4 para um bom espaçamento entre os cards */}
                {/* Card 1 */}
                <div className="flex w-full p-4 md:p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"> {/* Aumentei o padding e arredondamento */}
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-2"> {/* Aumentei mb */}
                      <span className="font-semibold text-gray-800 text-sm md:text-base">João Santos - Apt 301</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 2 horas</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Sugiro a instalação de câmeras de segurança no estacionamento para maior proteção dos veículos.
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100"> {/* Adicionei uma linha divisória sutil */}
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"> {/* Aumentei o padding do badge */}
                        <img className="h-3 w-3 mr-1" src="./Shield.png" alt="Tag" />
                        Segurança
                      </span>

                      <div className="flex space-x-4 text-sm font-medium">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <img className="h-4 w-4 mr-1" src="./Reply Arrow.png" alt="Responder" />
                          Responder
                        </a>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-700">
                          <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Aprovar" />
                          Aprovar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 (Espaçamento ajustado pelo space-y-4) */}
                <div className="flex w-full p-4 md:p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">Maria Silva - Apt 102</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 4 horas</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Proponho que o horário da piscina seja estendido nos fins de semana durante o verão.
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <img className="h-3 w-3 mr-1" src="./Shield.png" alt="Tag" />
                        Segurança
                      </span>

                      <div className="flex space-x-4 text-sm font-medium">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <img className="h-4 w-4 mr-1" src="./Reply Arrow.png" alt="Responder" />
                          Responder
                        </a>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-700">
                          <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Aprovar" />
                          Aprovar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 (Espaçamento ajustado pelo space-y-4) */}
                <div className="flex w-full p-4 md:p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">Carlos Almeida - Apt 504</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 1 dia</span>
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Devemos contratar um jardineiro profissional para melhorar a manutenção das áreas verdes.
                    </p>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <img className="h-3 w-3 mr-1" src="./Shield.png" alt="Tag" />
                        Segurança
                      </span>

                      <div className="flex space-x-4 text-sm font-medium">
                        <a href="#" className="flex items-center text-blue-600 hover:text-blue-700">
                          <img className="h-4 w-4 mr-1" src="./Reply Arrow.png" alt="Responder" />
                          Responder
                        </a>
                        <a href="#" className="flex items-center text-green-600 hover:text-green-700">
                          <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Aprovar" />
                          Aprovar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            {/* Div Tarefas Prioritarias */}
            <div className="w-full lg:w-[450px] bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col"> {/* Aumentei a largura em lg e o padding */}
              <div className='flex items-center gap-2 mb-6 border-b pb-4 border-gray-200'> {/* Ajustei o alinhamento, gap e pb */}
                <img className='h-7 w-7' src="./Error.png" alt="" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Tarefas Prioritárias
                </h1>
              </div>

              <div className="flex flex-col gap-4 text-sm"> {/* Aumentei o gap entre as tarefas */}
                <div className="flex bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm hover:scale-[1.01] transition-all items-center justify-between"> {/* Aumentei o padding e arredondamento */}
                  <div className="flex flex-col">
                    <p className="font-bold text-red-700 text-base md:text-lg">Vazamento Elevador</p>
                    <p className="text-red-600 text-sm">Apt 401 - Urgente</p>
                  </div>
                  <div className='bg-red-600 rounded-full px-4 py-1 text-white flex-shrink-0'>
                    <h1 className="text-xs font-semibold uppercase">Urgente</h1>
                  </div>
                </div>
                <div className="flex bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl shadow-sm hover:scale-[1.01] transition-all items-center justify-between"> {/* Corrigi o bg para orange-50 */}
                  <div className="flex flex-col">
                    <p className="font-bold text-orange-700 text-base md:text-lg">Portaria Desligada</p> {/* Corrigi o texto para ser diferente */}
                    <p className="text-orange-600 text-sm">Bloco B - Alta</p> {/* Corrigi o texto para ser diferente */}
                  </div>
                  <div className='bg-orange-600 rounded-full px-4 py-1 text-white flex-shrink-0'>
                    <h1 className="text-xs font-semibold uppercase">Alta</h1>
                  </div>
                </div>
                <div className="flex bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-xl shadow-sm hover:scale-[1.01] transition-all items-center justify-between"> {/* Corrigi o bg para yellow-50 */}
                  <div className="flex flex-col">
                    <p className="font-bold text-yellow-700 text-base md:text-lg">Lâmpada Queimada</p> {/* Corrigi o texto para ser diferente */}
                    <p className="text-yellow-600 text-sm">Garagem - Média</p> {/* Corrigi o texto para ser diferente */}
                  </div>
                  <div className='bg-yellow-600 rounded-full px-4 py-1 text-white flex-shrink-0'>
                    <h1 className="text-xs font-semibold uppercase">Média</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*
          SEÇÃO 5: FILTROS E LISTA DE SOLICITAÇÕES
          Aumentei a margem superior (mt) e padding de toda a seção, e o espaçamento (gap) entre as colunas.
        */}
        <div className="flex justify-center items-start px-4 md:px-6 mt-8 pb-10"> {/* Aumentei mt e pb */}
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-8 w-full max-w-[2300px]"> {/* Aumentei o gap entre as colunas */}

            {/* PAINEL DE FILTRO (Largura Fixa) */}
            <div className="w-full lg:w-[380px] bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col h-fit sticky top-6"> {/* Aumentei a largura em lg e o padding */}
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 pb-4 border-b border-gray-200"> {/* Aumentei pb */}
                Filtros
              </h1>

              <div className="flex flex-col space-y-6"> {/* Aumentei space-y para maior espaçamento entre os campos */}

                {/* Status */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-2 block">Status</label> {/* Aumentei mb */}
                  <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"> {/* Aumentei p e arredondamento */}
                    <option>Em Andamento</option>
                    <option>Concluída</option>
                    <option>Pendente</option>
                  </select>
                </div>

                {/* Prioridade */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-2 block">Prioridade</label> {/* Aumentei mb */}
                  <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"> {/* Aumentei p e arredondamento */}
                    <option>Todas</option>
                    <option>Urgente</option>
                    <option>Alta</option>
                  </select>
                </div>

                {/* Categorias */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-2 block">Categorias</label> {/* Aumentei mb */}
                  <select className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"> {/* Aumentei p e arredondamento */}
                    <option>Todas</option>
                    <option>Hidráulica</option>
                    <option>Elétrica</option>
                  </select>
                </div>

                {/* Data */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-2 block">Data</label> {/* Aumentei mb */}
                  <div className="relative">
                    <input type="text" placeholder="dd/mm/aaaa" className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10" /> {/* Aumentei p e arredondamento */}
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</span>
                  </div>
                </div>

                {/* Botão Filtrar */}
                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full py-3 text-center transition-colors mt-2">Filtrar {/* Aumentei py e tamanho da fonte */}
                </button>
              </div>
            </div>

            {/* LISTA DE SOLICITAÇÕES */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col"> {/* Aumentei o padding */}

              {/* Cabeçalho da Lista */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 pb-2 border-b-2 border-transparent">
                  Lista de Solicitações
                </h1>
                <div className="flex space-x-3 text-gray-400"> {/* Aumentei space-x */}
                  <span className="cursor-pointer text-blue-600 text-lg hover:text-blue-700 transition-colors">☰</span> {/* Aumentei tamanho do ícone */}
                  <span className="cursor-pointer text-lg hover:text-gray-600 transition-colors">▦</span> {/* Aumentei tamanho do ícone */}
                </div>
              </div>

              {/* Cabeçalho da Tabela (apenas desktop) */}
              <div className="hidden lg:grid grid-cols-8 gap-4 py-3 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200 mb-2"> {/* Aumentei py e mb */}
                <div className="col-span-2">SOLICITAÇÃO</div>
                <div>MORADOR</div>
                <div>CATEGORIA</div>
                <div>PRIORIDADE</div>
                <div>STATUS</div>
                <div>DATA</div>
                <div>AÇÕES</div>
              </div>

              {/* Linhas da Tabela */}
              <div className="divide-y divide-gray-100">
                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm hover:bg-gray-50 transition-colors"> {/* Aumentei py */}
                  <div className="col-span-2 flex flex-col">
                    <span className="font-semibold text-gray-800">Vazamento no banheiro</span>
                    <span className="text-gray-500 text-xs">Apt 304 - Problema na torneira</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-800">Pedro Silva</span>
                    <span className="text-xs text-gray-500">Apt 304</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <img className="h-4 w-4" src="./Water.png" alt="Hidráulica" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Hidráulica</span> {/* Ajustei o padding do badge */}
                  </div>

                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Urgente</span></div>
                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Em andamento</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">Hoje,</span>
                    <span className="text-xs text-gray-500">09:30</span>
                  </div>

                  <div className="flex space-x-3 items-center"> {/* Aumentei space-x */}
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Trash.png" alt="Deletar" /> {/* Aumentei o tamanho e hover */}
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Edit.png" alt="Editar" /> {/* Aumentei o tamanho e hover */}
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Eye.png" alt="Visualizar" /> {/* Aumentei o tamanho e hover */}
                  </div>
                </div>

                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm hover:bg-gray-50 transition-colors"> {/* Aumentei py */}
                  <div className="col-span-2 flex flex-col">
                    <span className="font-semibold text-gray-800">Iluminação da Garagem</span>
                    <span className="text-gray-500 text-xs">Bloco C - Lâmpada queimada</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-800">Ana Souza</span>
                    <span className="text-xs text-gray-500">Apt 101</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className="h-4 w-4" src="./Light.png" alt="Elétrica" />
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Elétrica</span>
                  </div>
                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">Alta</span></div>
                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Concluída</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">Ontem,</span>
                    <span className="text-xs text-gray-500">14:00</span>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Trash.png" alt="Deletar" />
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Edit.png" alt="Editar" />
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Eye.png" alt="Visualizar" />
                  </div>
                </div>

                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm hover:bg-gray-50 transition-colors"> {/* Aumentei py */}
                  <div className="col-span-2 flex flex-col">
                    <span className="font-semibold text-gray-800">Jardim da Piscina</span>
                    <span className="text-gray-500 text-xs">Área comum - Necessita poda</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mb-1"></div>
                    <span className="text-xs text-gray-800">Carlos Lima</span>
                    <span className="text-xs text-gray-500">Apt 502</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <img className="h-4 w-4" src="./Leaves.png" alt="Jardinagem" /> {/* Adicionei um ícone de Jardinagem */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-lime-100 text-lime-800">Jardinagem</span>
                  </div>
                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Média</span></div>
                  <div><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Pendente</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">15/09,</span>
                    <span className="text-xs text-gray-500">11:00</span>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Trash.png" alt="Deletar" />
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Edit.png" alt="Editar" />
                    <img className="h-5 w-5 cursor-pointer hover:scale-110 transition-transform" src="./Eye.png" alt="Visualizar" />
                  </div>
                </div>
              </div>

              {/* Paginação */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-100 text-sm text-gray-500"> {/* Aumentei mt */}
                <span>Mostrando **1 a 3** de **24** resultados</span>
                <div className="flex items-center space-x-2">
                  <a href="#" className="flex items-center px-2 py-1 hover:text-blue-600 transition-colors">‹ Anterior</a> {/* Adicionei padding e hover */}
                  <a href="#" className="px-3 py-1 bg-blue-600 text-white rounded-md font-medium shadow-md">1</a>
                  <a href="#" className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">2</a>
                  <a href="#" className="px-3 py-1 hover:bg-gray-100 rounded-md transition-colors">3</a>
                  <a href="#" className="flex items-center px-2 py-1 hover:text-blue-600 transition-colors">Próxima ›</a> {/* Adicionei padding e hover */}
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