import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

export default function Manutencao() {
  return (
    <>
      <header>
        <Header />
      </header>

      <main>
        {/* Procurar Icones que Combine Melhor */}
        <div className='flex justify-center items-center py-4 space-x-4'>
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

        <div className='mx-auto w-[90%] max-w-[2300px] mt-4'>
          <div>
            <div className='rounded-x1 grid grid-cols-4 gap-4 w-full'>
              <div className='border rounded-lg p-3 text-left'>
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

              <div className='border rounded-lg p-3 text-left'>
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

              <div className='border rounded-lg p-3 text-left'>
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

              <div className='border rounded-lg p-3 text-left'>
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
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}