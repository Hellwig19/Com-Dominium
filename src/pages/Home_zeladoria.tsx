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
        <Header />
      </header>

      <main className='bg-[#EAEAEA] min-h-screen'>
        {/* Card Inicial (Header) - ✅ Ajustado */}
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              {/* Tamanho de texto ajustado para ser menor em telas pequenas */}
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">Bom dia, Ema</h1> {/* puxar nome do perfil */}
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Zeladoria</h2> {/* puxar função aonde a pessoa trabalha*/}
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                {/* Tamanho de texto ajustado */}
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]">Segunda-feira, 18 de Setembro de 2025</h1> {/* puxar o dia da semana, dia do mês e ano*/}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Troca de Tela - ✅ Ajustado */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          {/* Largura ajustada para w-full e max-w-[2300px] */}
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">

            {/* Primeira linha de botões: Agora utiliza grid que colapsa para uma coluna em telas pequenas (grid-cols-1) e 3 colunas em telas médias (md:grid-cols-3) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              {/* Removidas larguras fixas (w-[400px]) para que o botão preencha o espaço (w-full) */}
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Complaint.png" alt="Cadastro de Morador" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                {/* Tamanho de texto ajustado */}
                <span className="text-base md:text-[22px]">Cadastro de Morador</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Account Male.png" alt="Sistemas de Reserva" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Sistemas de Reserva</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Wrench.png" alt="Manutenção/Sugestão" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Manutenção/Sugestão</span>
              </button>
            </div>

            {/* Segunda linha de botões: Agora utiliza grid que colapsa para uma coluna em telas pequenas e 2 colunas em telas médias (md:grid-cols-2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Plus.png" alt="Novo Comunicado" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Novo Comunicado</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Poll.png" alt="Nova Votação" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Nova Votação</span>
              </button>
            </div>
          </div>
        </div>

        {/* Div Principal de Votações e Resumo Financeiro - ✅ Ajustado */}
        {/* Agora utiliza flex-col em telas pequenas e flex-row em telas médias, com espaçamento flexível */}
        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px]">

            {/* Div Principal de Votações - Agora usa w-full e flex-1 */}
            <div className="flex-1 w-full bg-white rounded-2xl p-4 md:p-10 shadow-2xl flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                Votações em andamento
              </h1>

              {/* Grid ajustado para colapsar para 1 coluna em telas pequenas e 2 colunas em telas médias (md:grid-cols-2) */}
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

            {/* Div de Resumo Financeiro - Agora usa largura flexível em telas pequenas e largura fixa em telas grandes (lg:w-[400px]) */}
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

        {/* Gestão de Áreas Comuns (Calendário e Lista) - ✅ Ajustado */}
        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Gestão de Áreas Comuns</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm">Controle de disponibilidade e reservas</p>

            {/* Flex ajustado: Coluna em telas pequenas, Linha em telas médias (md:flex-row) */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">

              {/* Calendário: Largura e altura agora são flexíveis em telas pequenas (w-full, h-auto), mas limitadas em telas médias (md:w-[400px] md:h-[400px]) */}
              <div className="bg-gray-50 rounded-xl shadow-md p-4 md:p-6 w-full h-auto md:w-[400px] md:h-[400px] flex items-center justify-center">
                {/* O componente Calendar tem classes `scale-110` fixas, o que pode causar overflow. Removi o `scale-110` e adicionei `w-full` e `max-w-full` para garantir que ele se adapte melhor ao container. */}
                <Calendar onChange={setValue} value={value} className="border-none rounded-xl shadow-sm p-2 md:p-4 bg-white w-full max-w-full" />
              </div>

              {/* Lista de Áreas - Usa flex-1 e w-full */}
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
                    {/* Preço movido para baixo em telas pequenas para não quebrar a linha, usando flex-col e sm:flex-row */}
                    <span className="text-gray-700 font-medium ml-14 sm:ml-0">{area.preco}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Cadastros Pendentes e Autorizaçãos</h1>
            <p className="text-gray-500 mb-6 md:mb-8 text-sm">Novos moradores aguardando validação</p>
            <div className='bg-[#FEF9C3] p-2 rounded-lg border'>
              <h1>Eduardo Santos</h1>
              <div>
                <h1>Casa Nº</h1> {/* Puxar o numero da casa que está sendo cadastrado */}
                <div className='w-16 h-5 bg-amber-300 rounded-[5px] flex text-center'>
                  <h1 className='w-16 h-3.5 justify-start text-yellow-600 text-xs font-bold'>Pendente</h1>
                </div>
              </div>
              <h1 className='opacity-40 justify-start text-black text-sm font-medium'>Solicitado em 15/09/2025</h1>
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

export default Zeladoria;