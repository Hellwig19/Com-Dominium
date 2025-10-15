import { useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Footer from '../Components/footer';
import Header from "../Components/Header";

const Zeladoria = () => {
    const [value, setValue] = useState(new Date());

  const areas = [
    {
      nome: "Salão de Festas",
      capacidade: "120 pessoas",
      preco: "R$ 180/dia",
      status: "Disponível",
      cor: "bg-purple-500",
      texto: "text-green-600",
    },
    {
      nome: "Quiosque 1",
      capacidade: "8 pessoas",
      preco: "R$ 80/dia",
      status: "Disponível",
      cor: "bg-green-500",
      texto: "text-green-600",
    },
    {
      nome: "Quiosque 2",
      capacidade: "10 pessoas",
      preco: "R$ 90/dia",
      status: "Ocupado",
      cor: "bg-red-500",
      texto: "text-red-600",
    },
    {
      nome: "Quiosque 3",
      capacidade: "12 pessoas",
      preco: "R$ 100/dia",
      status: "Manutenção",
      cor: "bg-orange-500",
      texto: "text-orange-600",
    },
  ];
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

        <div className="flex justify-center items-start mt-6 p-6">
          <div className="flex gap-10 w-full max-w-[1600px]">
            {/* Div Principal de Votações */}
            <div className="flex-1 bg-white rounded-2xl p-10 shadow-2xl flex flex-col">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Votações em andamento
              </h1>

              <div className="grid grid-cols-2 gap-6">
                {/* Card de Votação */}
                {[
                  {
                    titulo: "Reforma da Área de Lazer",
                    desc: "Proposta de reforma completa, incluindo pintura, novos equipamentos e paisagismo.",
                    sim: 234,
                    nao: 89,
                  },
                  {
                    titulo: "Troca do Portão Principal",
                    desc: "Substituição do portão principal por um modelo automatizado e reforçado.",
                    sim: 198,
                    nao: 47,
                  },
                  {
                    titulo: "Instalação de Câmeras",
                    desc: "Proposta para instalação de câmeras de segurança em todas as entradas e áreas comuns.",
                    sim: 321,
                    nao: 34,
                  },
                  {
                    titulo: "Nova Academia",
                    desc: "Proposta de construção de uma nova academia moderna para os moradores.",
                    sim: 402,
                    nao: 120,
                  },
                ].map((votacao, i) => (
                  
                <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">{votacao.titulo}</h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                    {votacao.desc}
                  </p>

                    {/* Seção de Votos */}
                    <div className="flex justify-between mt-4">
                      {/* Votos positivos */}
                      <div className="flex items-center gap-2">
                        <img src="../Done.png" alt="Votos a favor" className="w-6 h-6 object-contain"/>
                        <span className="text-green-600 font-medium">
                          {votacao.sim} votos
                        </span>
                      </div>

                      {/* Votos negativos */}
                      <div className="flex items-center gap-2"> <img src="../Multiply.png" alt="Votos contra" className="w-6 h-6 object-contain"/>
                        <span className="text-red-500 font-medium">
                          {votacao.nao} votos
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Div de Resumo Financeiro */}
            <div className="w-[400px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col ">
              <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Resumo Financeiro
              </h1>

              <div className="flex flex-col gap-4 text-sm text-[20px]">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all">
                  <p className="font-semibold text-green-700">Receita mensal</p>
                  <p className="text-green-600">
                    R$ 135.269,00 <span className="text-green-600">↑</span>
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all ">
                  <p className="font-semibold text-red-700">Despesas mensais</p>
                  <p className="text-red-600">
                    R$ 45.269,00 <span className="text-red-600">↓</span>
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all">
                  <p className="font-semibold text-blue-700">Saldo disponível</p>
                  <p className="text-blue-700">R$ 90.000,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Ajustar essa parte*/}
      <div className="flex justify-center items-center mt-10">
        <div className="w-[96%] max-w-[2300px] bg-white rounded-2xl shadow-2xl p-10">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Gestão de Áreas Comuns</h1>
          <p className="text-gray-500 mb-8 text-sm">Controle de disponibilidade e reservas</p>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Calendário */}
          <div className="bg-gray-50 rounded-xl shadow-md p-6 w-[400px] h-[400px] flex items-center justify-center">
            <Calendar onChange={setValue} value={value} className="border-none rounded-xl shadow-sm p-4 bg-white scale-110"/>
          </div>

            {/* Lista de Áreas */}
            <div className="flex-1 flex flex-col gap-4">
              {areas.map((area, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${area.cor} rounded-lg flex items-center justify-center text-white text-xl`}>🏠
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{area.nome}</h3>
                      <p className="text-sm text-gray-600">Capacidade: {area.capacidade}</p>
                      <p className={`text-sm font-medium ${area.texto}`}>{area.status}</p>
                    </div>
                  </div>
                  <span className="text-gray-700 font-medium">{area.preco}</span>
                </div>
              ))}
            </div>
          </div>
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