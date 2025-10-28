import { useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Footer from '../Components/footer';
import Header from "../Components/Header";
import DataAtual from '../Components/Data';
import ModalVot from '../Components/Modal_Votacao';
import ModalComu from '../Components/Modal_Comunicacao';

const Administracao = () => {

    {/* Codigo Modal Votação */}
  const [isVotacaoModalOpen, setIsVotacaoModalOpen] = useState(false);

  const handleOpenVotacaoModal = () => setIsVotacaoModalOpen(true);
  const handleCloseVotacaoModal = () => setIsVotacaoModalOpen(false);

    {/* Codigo Modal Comunicação */}
  const [isComunicacaoModalOpen, setIsComunicacaoModalOpen] = useState(false);

  const handleOpenComunicacaoModal = () => setIsComunicacaoModalOpen(true);
  const handleCloseComunicacaoModal = () => setIsComunicacaoModalOpen(false);

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

  const cadastrosPendentes = [
    { nome: "Eduardo Santos", casa: "15", data: "15/09/2025" },
    { nome: "Julia Almeida", casa: "22", data: "15/09/2025" },
    { nome: "Pedro Lima", casa: "3", data: "16/09/2025" },
  ];

  const moradores = [
    { nome: "João Silva", casa: "101", cpf: "123.456.789-00", tel: "(11) 98765-4321" },
    { nome: "Maria Souza", casa: "202", cpf: "987.654.321-00", tel: "(11) 91234-5678" },
    { nome: "Pedro Rocha", casa: "303", cpf: "456.789.123-00", tel: "(21) 99887-7665" },
    { nome: "Ana Lima", casa: "404", cpf: "654.321.987-00", tel: "(21) 97654-3210" },
  ];
  return (
    <>
      <header>
        <Header />
      </header>

      <ModalVot
        isOpen={isVotacaoModalOpen}
        onClose={handleCloseVotacaoModal}
      />

      <ModalComu
        isOpen={isComunicacaoModalOpen}
        onClose={handleCloseComunicacaoModal}
      />

      <main className='bg-[#EAEAEA] min-h-screen'>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">Bom dia, Ema</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Adminstração</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]"><DataAtual></DataAtual></h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Troca de Tela */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">

            {/* Primeira linha de botões */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Complaint.png" alt="Cadastro de Morador" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Cadastro de Morador</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Account Male.png" alt="Sistemas de Reserva" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Sistemas de Reserva</span>
              </button>
              <a href="/manutencao">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Wrench.png" alt="Manutenção/Sugestão" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Manutenção/Sugestão</span>
                </button>
              </a>
            </div>

            {/* Segunda linha de botões */}
            <div className="flex flex-col items-center">
              <div className="w-full md:w-2/3 flex flex-col md:flex-row gap-4 md:gap-10 mx-auto">
                <button onClick={handleOpenComunicacaoModal} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="Novo Comunicado" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Novo Comunicado</span>
                </button>
                <button onClick={handleOpenVotacaoModal} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../PollAzul.png" alt="Nova Votação" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Nova Votação</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Div Principal de Votações e Resumo Financeiro*/}
        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px]">

            {/* Div Principal de Votações */}
            <div className="flex-1 w-full bg-white rounded-2xl p-4 md:p-10 shadow-2xl flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Votações em andamento
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Card de Votação */}
                {[
                  { titulo: "Reforma da Área de Lazer", desc: "Proposta de reforma completa, incluindo pintura, novos equipamentos e paisagismo.", sim: 234, nao: 89 },
                  { titulo: "Troca do Portão Principal", desc: "Substituição do portão principal por um modelo automatizado e reforçado.", sim: 198, nao: 47 },
                  { titulo: "Instalação de Câmeras", desc: "Proposta para instalação de câmeras de segurança em todas as entradas e áreas comuns.", sim: 321, nao: 34 },
                  { titulo: "Nova Academia", desc: "Proposta de construção de uma nova academia moderna para os moradores.", sim: 402, nao: 120 },
                ].map((votacao, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    <h2 className="text-base md:text-lg font-semibold text-gray-800 mb-2">{votacao.titulo}</h2>
                    <p className="text-xs md:text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
                      {votacao.desc}
                    </p>

                    {/* Seção de Votos */}
                    <div className="flex justify-between mt-4">
                      {/* Votos positivos */}
                      <div className="flex items-center gap-2">
                        <img src="../Done.png" alt="Votos a favor" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                        <span className="text-sm text-green-600 font-medium">
                          {votacao.sim} votos
                        </span>
                      </div>

                      {/* Votos negativos */}
                      <div className="flex items-center gap-2"> <img src="../Multiply.png" alt="Votos contra" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                        <span className="text-sm text-red-500 font-medium">
                          {votacao.nao} votos
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Div de Resumo Financeiro */}
            <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Resumo Financeiro
              </h1>

              <div className="flex flex-col gap-4 text-sm md:text-[20px]">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all">
                  <p className="font-semibold text-green-700 text-sm">Receita mensal</p>
                  <p className="text-green-600 text-lg md:text-xl">
                    R$ 135.269,00 <span className="text-green-600">↑</span>
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all ">
                  <p className="font-semibold text-red-700 text-sm">Despesas mensais</p>
                  <p className="text-red-600 text-lg md:text-xl">
                    R$ 45.269,00 <span className="text-red-600">↓</span>
                  </p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm hover:scale-[1.02] transition-all">
                  <p className="font-semibold text-blue-700 text-sm">Saldo disponível</p>
                  <p className="text-blue-700 text-lg md:text-xl">R$ 90.000,00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gestão de Áreas Comuns (Calendário e Lista) */}
        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Gestão de Áreas Comuns</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm">Controle de disponibilidade e reservas</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">

              {/* Calendário */}
              <div className="bg-gray-50 rounded-xl shadow-md p-4 md:p-6 w-full h-auto md:w-[400px] md:h-[400px] flex items-center justify-center">
                <Calendar onChange={setValue} value={value} className="border-none rounded-xl shadow-sm p-2 md:p-4 bg-white w-full max-w-full" />
              </div>

              {/* Lista de Áreas */}
              <div className="flex-1 w-full flex flex-col gap-4">
                {areas.map((area, i) => (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                      <div className={`w-10 h-10 ${area.cor} rounded-lg flex items-center justify-center text-white text-xl`}>🏠
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{area.nome}</h3>
                        <p className="text-sm text-gray-600">Capacidade: {area.capacidade}</p>
                        <p className={`text-sm font-medium ${area.texto}`}>{area.status}</p>
                      </div>
                    </div>
                    <span className="text-gray-700 font-medium ml-14 sm:ml-0">{area.preco}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Cadastros Pendentes de Aprovação</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm">Novos moradores aguardando validação</p>

            {/* Div de Cards */}
            <div className='space-y-4'>
              {cadastrosPendentes.map((cadastro, index) => (
                <div key={index} className='bg-yellow-50 p-4 rounded-xl border flex items-center justify-between shadow-sm'>
                  <div className='flex items-center gap-4 flex-grow'>

                    {/* Avatar (Ícone de usuário) se for colocar*/}
                    {/* <div className='w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-10 h-10 text-gray-400' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div> */}

                    <div>
                      <div className='flex items-center space-x-2'>
                        <h1 className='text-lg font-semibold text-gray-800'>{cadastro.nome}</h1>
                        <div className='px-2 h-5 bg-amber-300 rounded-[5px] flex items-center justify-center flex-shrink-0'>
                          <span className='text-yellow-700 text-xs font-bold'>Pendente</span>
                        </div>
                      </div>

                      <h1 className='text-sm font-medium text-gray-700'>Casa Nº **{cadastro.casa}**</h1>
                      <h1 className='opacity-70 text-black text-xs font-medium mt-0.5'>Solicitado em {cadastro.data}</h1>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 flex-shrink-0 ml-4'>

                    {/* Botão Visualizar */}
                    <button className='flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition'>
                      <img src="../View.png" alt="Visualizar" className='w-4 h-4 mr-2' />Visualizar</button>

                    {/* Botão Aprovar */}
                    <button className='flex items-center px-4 py-2 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition shadow-md'>
                      <img src="../DoneBranco.png" alt="Aprovar" className='w-4 h-4 mr-2' />Aprovar</button>

                    {/* Botão Rejeitar */}
                    <button className='flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition shadow-md'>
                      <img src="../MultiplyBranco.png" alt="Rejeitar" className='w-4 h-4 mr-2' />Rejeitar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">

            {/* Títulos */}
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Moradores Cadastrados</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm">Lista de moradores aprovados</p>

            <div className="mb-8">
              <form className="flex items-center w-full max-w-lg">
                <label htmlFor="search-input" className="sr-only">Buscar Moradores</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="text" id="search-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Buscar por nome, CPF ou casa..." required />
                </div>

                <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-purple-800 rounded-lg border border-purple-800 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors">
                  <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  Pesquisar
                </button>
              </form>
            </div>

            {/* Div onde a lista de moradores*/}
            <div className='grid grid-cols-2 gap-4 pt-4 border-t border-gray-200'>
              {moradores.map((morador, index) => (
                <div key={index} className='bg-gray-50 p-4 rounded-lg flex items-center justify-between shadow-sm border border-gray-100'>
                  <div className='flex items-center gap-4'>
                    <div className='w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                      <svg className='w-8 h-8 text-blue-600' fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold text-gray-800'>{morador.nome} (Casa Nº {morador.casa})</h1>
                      <h1 className='text-sm text-gray-500'>CPF: {morador.cpf} | Tel: {morador.tel}</h1>
                    </div>
                  </div>
                  <button className='px-4 py-2 bg-indigo-500 text-white rounded-lg font-medium text-sm hover:bg-indigo-600 transition shadow-md flex-shrink-0'>
                    Ver Detalhes
                  </button>
                </div>
              ))}-
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Administracao;