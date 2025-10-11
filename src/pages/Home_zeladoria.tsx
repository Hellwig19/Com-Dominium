import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

const Zeladoria = () => {
  return (
    <>
      <header>
        <Header/>
      </header>

      <main className='bg-[#EAEAEA]'>
        {/* Card Inicial*/}
        <div className="bg-white flex flex-col items-center justify-center min-h-[25vh]">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-[200px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl px-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-[40px] font-semibold leading-tight m-0">Bom dia, Ema</h1> {/* puxar nome do perfil */}
              <h2 className="text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Zeladoria</h2> {/* puxar função aonde a pessoa trabalha*/}      
              <div className="flex mt-8">
                <img className="h-[30px] w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-[20px] ml-[10px]">Segunda-feira, 18 de Setembro de 2025</h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Troca de Tela*/}
        <div className="flex flex-col items-center justify-center min-h-[35vh]">
          <div className="bg-white w-[96%] max-w-[2300px] h-auto rounded-xl px-10 py-10 shadow-lg flex flex-col gap-6">

            {/* Primeira linha de botões */}
            <div className="flex justify-center gap-10 pb-[15px]">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-[400px] h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Complaint.png" alt="Cadastro de Morador" className="h-[35px] w-[35px]"/>
                <span className="text-[22px]">Cadastro de Morador</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-[400px] h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Account Male.png" alt="Sistemas de Reserva" className="h-[35px] w-[35px]"/>
                <span className="text-[22px]">Sistemas de Reserva</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-[400px] h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Wrench.png" alt="Manutenção/Sugestão" className="h-[35px] w-[35px]"/>
                <span className="text-[22px]">Manutenção/Sugestão</span>
              </button>
            </div>

            {/* Segunda linha de botões */}
            <div className="flex justify-center gap-10">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-[400px] h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Plus.png" alt="Novo Comunicado" className="h-[35px] w-[35px]"/>
                <span className="text-[22px]">Novo Comunicado</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-[400px] h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Poll.png" alt="Nova Votação" className="h-[35px] w-[35px]"/>
                <span className="text-[22px]">Nova Votação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ajeitar Melhor essa parte */}
        <div className="flex justify-center gap-50 min-h-[10vh]">
          <div className="bg-white rounded-xl px-10 py-10 shadow-lg flex gap-6">
            {/* Div de Votações */}
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md flex flex-col gap-4">
              <h1 className="text-lg font-semibold mb-4">Votações em andamento</h1>
              {/* Cards de Votação */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <h2 className="font-medium">Reforma da Área de lazer</h2>
                  <p className="text-sm text-gray-600">
                    Proposta de reforma completa, incluindo pintura, novos equipamentos e paisagismo.
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 mr-2">234 votos</span>
                    <span className="text-red-500 ml-2">89 votos</span>
                  </div>
                </div>
                {/* 2 Card de Votação */}
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <h2 className="font-medium">Reforma da Área de lazer</h2>
                  <p className="text-sm text-gray-600">
                    Proposta de reforma completa, incluindo pintura, novos equipamentos e paisagismo.
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 mr-2">234 votos</span>
                    <span className="text-red-500 ml-2">89 votos</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
            {/* Div de Resumo Financeiro */}
            <div className="w-64 bg-white p-4 rounded-lg shadow-md flex flex-col gap-3">
              <h1 className="text-lg font-semibold mb-4">Resumo Financeiro</h1>
              <div className="bg-green-100 p-2 rounded-md">Receita mensal R$ 135.269,00 ↑</div>
              <div className="bg-red-100 p-2 rounded-md">Despesas mensais R$ 45.269,00 ↓</div>
              <div className="bg-blue-100 p-2 rounded-md">Saldo disponível R$ 90.000,00 💳</div>
            </div>
        </div>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Zeladoria;