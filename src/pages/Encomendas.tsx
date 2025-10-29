import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

export default function Encomendas() {
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
          {/*Mudar Icone*/}
          <a href="/encomendas"> 
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
              <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="" />
              Encomendas
            </button>
          </a>
          {/*Por a modal de visitantes aqui tambem/mudar icone*/}
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
            <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="" />
            Visitantes
          </button>
        </div>

        <div>

        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}