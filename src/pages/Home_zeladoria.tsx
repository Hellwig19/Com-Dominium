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
        <div>

        </div>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default Zeladoria;