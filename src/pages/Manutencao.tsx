import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

export default function Manutencao() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA]'>
        {/* Procurar Icones que Combine Melhor */}
        <div className='bg-white flex justify-center items-center py-4 space-x-4'>
          <button className='px-6 py-2 bg-white text-gray-700 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex'>
            <img className="px-2" src="./Home.png" alt="" />
            Inicio
          </button>
          <button className='px-6 py-2 bg-white text-gray-700 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex'>
            <img className="px-2" src="./Megaphone.png" alt="" />
            Comunicação
          </button>
          <button className='px-6 py-2 bg-white text-gray-700 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex'>
            <img className="px-2" src="./PollAzul.png" alt="" />
            Votação
          </button>
        </div>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-4">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">Bom dia, Ema</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Zeladoria</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]">Segunda-feira, 18 de Setembro de 2025</h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        {/* Div Cards de Status */}
        <div className='mx-auto w-[90%] max-w-[2300px] mt-4 '>
          <div>
            <div className='rounded-x1 grid grid-cols-4 gap-4 w-full '>
              <div className='border rounded-lg p-3 text-left bg-white'>
                <h1 className='text-gray-600 text-[20px]'>Sugestãos Pendentes</h1>
                <div className='flex justify-between text-[30px] text-center items-center'>
                  <h1>8</h1>
                  <div className='bg-blue-100 flex items-center rounded-xl p-1.5'>
                    <img className='w-[35px] h-[35px]' src="./Light.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <img src="./Up Arrow.png" alt="" />
                  <h1 className="text-sm text-green-600 text-[15px]">+12% Esta semana</h1>
                </div>
              </div>

              <div className='border rounded-lg p-3 text-left bg-white'>
                <h1 className='text-gray-600 text-[20px]'>Manutenção Ativa</h1>
                <div className='flex justify-between text-[30px] text-center items-center'>
                  <h1>4</h1>
                  <div className='bg-orange-100 flex items-center rounded-xl p-1.5'>
                    <img className='w-[35px] h-[35px]' src="./Tools.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <img src="./Clock.png" alt="" />
                  <h1 className="text-sm text-orange-600 text-[15px]">2 Urgentes</h1>
                </div>
              </div>

              <div className='border rounded-lg p-3 text-left bg-white'>
                <h1 className='text-gray-600 text-[20px]'>Manutenção Ativa</h1>
                <div className='flex justify-between text-[30px] text-center items-center'>
                  <h1>6</h1>
                  <div className='bg-green-100 flex items-center rounded-xl p-1.5'>
                    <img className='w-[35px] h-[35px]' src="./Check Mark.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <img src="./DoneVerdeEscuro.png" alt="" />
                  <h1 className="text-sm text-green-600 text-[15px]">Meta Atingida</h1>
                </div>
              </div>

              <div className='border rounded-lg p-3 text-left bg-white'>
                <h1 className='text-gray-600 text-[20px]'>Moradores Ativos</h1>
                <div className='flex justify-between text-[30px] text-center items-center'>
                  <h1>127</h1>
                  <div className='bg-purple-100 flex items-center rounded-xl p-1.5'>
                    <img className='w-[35px] h-[35px]' src="./BuildingRoxo.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row text-center items-center gap-1'>
                  <img src="./Users.png" alt="" />
                  <h1 className="text-sm text-purple-600 text-[15px]">80% Participação</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px]">

            {/* Div Sugestão Recentes */}
            <div className="flex-1 w-full bg-white rounded-2xl p-4 md:p-10 shadow-2xl flex flex-col">
              <div className='flex justify-between items-center mb-6 border-b pb-3 border-gray-200'>
                <div className='flex text-center gap-1 items-center'>
                  <img className="h-8 w-8" src="./Chat.png" alt="Ícone de chat" />
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
              {/* Card 1 */}
              <div className="flex flex-col space-y-4">
                <div className="flex w-full p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">João Santos - Apt 301</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 2 horas</span> {/* Atualizar com o Horario que foi Puxado*/}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Sugiro a instalação de câmeras de segurança no estacionamento para maior proteção dos veículos.
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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

                {/* Card 2 */}
                <div className="flex w-full p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">Maria Silva - Apt 102</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 4 horas</span> {/* Atualizar com o Horario que foi Puxado*/}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Proponho que o horário da piscina seja estendido nos fins de semana durante o verão.
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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

                {/* Card 3 */}
                <div className="flex w-full p-3 md:p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100">
                  <div className="h-10 w-10 md:h-12 md:w-12 bg-gray-300 rounded-full flex-shrink-0 mr-4"></div>
                  <div className="flex-1 min-w-0">

                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">Carlos Almeida - Apt 504</span>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-4">Há 1 dia</span> {/* Atualizar com o Horario que foi Enviado*/}
                    </div>

                    <p className="text-sm text-gray-700 mb-3">
                      Devemos contratar um jardineiro profissional para melhorar a manutenção das áreas verdes.
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
            <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col">
              <div className='flex flex-cow gap-1'>
                <img className='h-8 w-8' src="./Error.png" alt="" />
                <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 pb-3">
                  Tarefas Prioritárias
                </h1>
              </div>

              {/* Verificar se essa tela está correta */}
              <div className="flex flex-col gap-4 text-sm md:text-[20px]">
                <div className="flex bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-red-700 text-lg md:text-xl">Vazamento Elevador</p>
                    <p className="text-red-600 text-sm">Apt 401 - Urgente</p>
                  </div>
                  <div className='bg-red-600 rounded-full px-4 py-1.5 text-white flex-shrink-0'>
                    <h1 className="text-sm font-semibold uppercase">Urgente</h1>
                  </div>
                </div>
                <div className="flex bg-red-50 border-l-4 border-orange-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-orange-700 text-lg md:text-xl">Vazamento Elevador</p>
                    <p className="text-orange-600 text-sm">Apt 401 - Alta</p>
                  </div>
                  <div className='bg-orange-600 rounded-full px-4 py-1.5 text-white flex-shrink-0'>
                    <h1 className="text-sm font-semibold uppercase">Alta</h1>
                  </div>
                </div>
                <div className="flex bg-red-50 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all items-center justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold text-yellow-700 text-lg md:text-xl">Vazamento Elevador</p>
                    <p className="text-yellow-600 text-sm">Apt 401 - Media</p>
                  </div>
                  <div className='bg-yellow-600 rounded-full px-4 py-1.5 text-white flex-shrink-0'>
                    <h1 className="text-sm font-semibold uppercase">Média</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Div do Filtro */}
        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px]">

            {/* PAINEL DE FILTRO (Largura Fixa) */}
            <div className="w-full lg:w-[340px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col h-fit sticky top-6">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 pb-3 border-b border-gray-200">
                Filtros
              </h1>

              <div className="flex flex-col space-y-5">

                {/* Status */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1 block">Status</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                    <option>Em Andamento</option>
                    <option>Concluída</option>
                    <option>Pendente</option>
                  </select>
                </div>

                {/* Prioridade */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1 block">Prioridade</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                    <option>Todas</option>
                    <option>Urgente</option>
                    <option>Alta</option>
                  </select>
                </div>

                {/* Categorias */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1 block">Categorias</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                    <option>Todas</option>
                    <option>Hidráulica</option>
                    <option>Elétrica</option>
                  </select>
                </div>

                {/* Data */}
                <div>
                  <label className="text-gray-700 font-semibold text-sm mb-1 block">Data</label>
                  <div className="relative">
                    <input type="text" placeholder="dd/mm/aaaa" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 pr-10" />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">📅</span>
                  </div>
                </div>

                {/* Botão Filtrar */}
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors">Filtrar
                </button>
              </div>
            </div>

            <div className="flex-1 w-full bg-white rounded-2xl p-4 md:p-8 shadow-2xl flex flex-col">

              {/* Cabeçalho da Lista */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 pb-2 border-b-2 border-transparent">
                  Lista de Solicitações
                </h1>
                <div className="flex space-x-2 text-gray-400">
                  <span className="cursor-pointer text-blue-600">☰</span>
                  <span className="cursor-pointer">▦</span>
                </div>
              </div>


              {/* Ajeitar essa parte ainda */}
              <div className="hidden lg:grid grid-cols-8 gap-4 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                <div className="col-span-2">SOLICITAÇÃO</div>
                <div>MORADOR</div>
                <div>CATEGORIA</div>
                <div>PRIORIDADE</div>
                <div>STATUS</div>
                <div>DATA</div>
                <div>AÇÕES</div>
              </div>

              <div className="divide-y divide-gray-100">

                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm">
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Hidráulica</span>
                  </div>

                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Urgente</span></div>
                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Em andamento</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">Hoje,</span>
                    <span className="text-xs text-gray-500">09:30</span>
                  </div>

                  <div className="flex space-x-2 items-center">
                    <img className="h-4 w-4 cursor-pointer" src="./Trash.png" alt="Deletar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Edit.png" alt="Editar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Eye.png" alt="Visualizar" />
                  </div>
                </div>

                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm">
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Hidráulica</span>
                  </div>
                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Urgente</span></div>
                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Em andamento</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">Hoje,</span>
                    <span className="text-xs text-gray-500">09:30</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <img className="h-4 w-4 cursor-pointer" src="./Trash.png" alt="Deletar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Edit.png" alt="Editar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Eye.png" alt="Visualizar" />
                  </div>
                </div>

                <div className="grid grid-cols-8 gap-4 py-4 items-center text-sm">
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
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Hidráulica</span>
                  </div>
                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Urgente</span></div>
                  <div><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Em andamento</span></div>
                  <div className="flex flex-col">
                    <span className="text-gray-800">Hoje,</span>
                    <span className="text-xs text-gray-500">09:30</span>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <img className="h-4 w-4 cursor-pointer" src="./Trash.png" alt="Deletar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Edit.png" alt="Editar" />
                    <img className="h-4 w-4 cursor-pointer" src="./Eye.png" alt="Visualizar" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500">
                <span>Mostrando 1 a 3 de 24 resultados</span>
                <div className="flex items-center space-x-2">
                  <a href="#" className="flex items-center hover:text-blue-600">‹ Anterior</a>
                  <a href="#" className="px-3 py-1 bg-blue-600 text-white rounded-md">1</a>
                  <a href="#" className="px-3 py-1 hover:bg-gray-100 rounded-md">2</a>
                  <a href="#" className="px-3 py-1 hover:bg-gray-100 rounded-md">3</a>
                  <a href="#" className="flex items-center hover:text-blue-600">Próxima ›</a>
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