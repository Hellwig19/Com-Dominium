import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';
import ModalCad from '../Components/Modal_CadastrarVis';
import ModalUltimosAcessos from '../Components/Modal_UltimosAcessos';
import api from '../services/api';

interface Visitante {
  id: number;
  nome: string;
  cpf: string;
  numeroCasa: string; 
  placa?: string | null;
  status: 'DENTRO' | 'SAIU'; 
  dataEntrada: string;
  dataSaida?: string | null;
}

interface FeedItem {
  id: string;
  tipo: string;
  titulo: string;
  subtitulo: string;
  timestamp: string;
}

interface MoradorBusca {
  id: string;
  nome: string;
  cpf: string;
  residencias: { numeroCasa: string }[];
  veiculos: { placa: string; modelo: string }[];
  moradores: { nome: string }[]; 
}

export default function HomePortaria() {
  const [isVisitanteModalOpen, setIsVisitanteModalOpen] = useState(false);
  const [isUltimosAcessosOpen, setIsUltimosAcessosOpen] = useState(false); 
  const [porteiroNome, setPorteiroNome] = useState('Colaborador');
  const [listaVisitantes, setListaVisitantes] = useState<Visitante[]>([]);
  const [logs, setLogs] = useState<FeedItem[]>([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [moradorEncontrado, setMoradorEncontrado] = useState<MoradorBusca | null>(null);
  const [isLoadingBusca, setIsLoadingBusca] = useState(false);

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) setPorteiroNome(nomeSalvo.split(' ')[0]);

    carregarDadosIniciais();
  }, []);

  const carregarDadosIniciais = async () => {
    try {
      const resVisitantes = await api.get('/visitantes/hoje');
      setListaVisitantes(resVisitantes.data);

      const resLogs = await api.get('/atividades/geral');
      setLogs(resLogs.data);
    } catch (error) {
      console.error("Erro ao carregar painel da portaria:", error);
    }
  };

  const handleOpenVisitanteModal = () => setIsVisitanteModalOpen(true);
  const handleCloseVisitanteModal = () => {
    setIsVisitanteModalOpen(false);
    carregarDadosIniciais();
  };

  const handleOpenUltimosAcessos = () => setIsUltimosAcessosOpen(true);
  const handleCloseUltimosAcessos = () => setIsUltimosAcessosOpen(false);

  const handleRegistrarSaida = async (id: number) => {
      if (!confirm("Confirmar saída do visitante?")) return;
      try {
          await api.patch(`/visitantes/${id}/saida`);
          carregarDadosIniciais(); 
      } catch (error) {
          alert("Erro ao registrar saída.");
      }
  };

  const handleBuscarMorador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termoBusca) return;

    setIsLoadingBusca(true);
    setMoradorEncontrado(null);

    try {
      const res = await api.get('/clientes'); 
      const clientes: any[] = res.data;

      const encontrado = clientes.find(c => 
        c.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        c.cpf.includes(termoBusca)
      );

      if (encontrado) {
        const resDetalhes = await api.get(`/clientes/${encontrado.id}`);
        setMoradorEncontrado(resDetalhes.data);
      } else {
        alert("Morador não encontrado.");
      }

    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Erro ao buscar morador.");
    } finally {
      setIsLoadingBusca(false);
    }
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <ModalCad
        isOpen={isVisitanteModalOpen}
        onClose={handleCloseVisitanteModal}
      />

      <ModalUltimosAcessos 
        isOpen={isUltimosAcessosOpen}
        onClose={handleCloseUltimosAcessos}
        visitantes={listaVisitantes}
        onRegistrarSaida={handleRegistrarSaida}
      />

      <main className='bg-[#EAEAEA] min-h-screen pb-10'>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">
                {getSaudacao()}, {porteiroNome}
              </h1>
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Portaria</h2>
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]"><DataAtual /></h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-8 mb-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              <a href="/encomendas">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="Encomendas" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Encomendas</span>
                </button>
              </a>
              
              <button
                onClick={handleOpenVisitanteModal}
                className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                <img src="../Account Male.png" alt="Cadastrar Visitante" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Cadastrar Visitantes</span>
              </button>
              <button 
                onClick={handleOpenUltimosAcessos}
                className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                <img src="../EyeRoxo.png" alt="Ultimos Acessos" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Últimos Acessos</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-8 mb-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-0 shadow-lg flex flex-col gap-4 md:gap-6 overflow-hidden">

            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Busca de Morador
              </h1>
              <form className="w-full md:max-w-sm" onSubmit={handleBuscarMorador}>
                <div className="relative">
                  <input 
                    type="search" 
                    className="block w-full p-2.5 pl-4 pr-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-400 focus:border-blue-400 placeholder-gray-500 shadow-inner transition duration-150 ease-in-out" 
                    placeholder="Buscar por nome ou CPF..." 
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                  />
                  <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5e5ced]">
                    {isLoadingBusca ? '...' : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {moradorEncontrado ? (
                <div className="px-6 pb-6 md:px-10 md:pb-10 animate-fade-in">
                    <div className="w-full relative">
                        <div className="h-24 md:h-28 bg-gradient-to-r from-[#5e5ced] to-[#572486] px-6 py-6 flex items-center justify-between text-white rounded-t-xl">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50">
                                <span className="text-2xl font-bold">{moradorEncontrado.nome.charAt(0)}</span>
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold">
                                {moradorEncontrado.nome}
                            </h2>
                        </div>
                        <span className="text-lg md:text-xl font-semibold opacity-90">
                            Casa {moradorEncontrado.residencias[0]?.numeroCasa || "S/N"}
                        </span>
                        </div>

                        <div className="bg-white rounded-b-xl shadow-xl p-6 md:p-8 relative z-10 mt-[-20px] mx-4 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                            <div className="flex items-center text-gray-700 font-bold text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>
                                CPF
                            </div>
                            <div className="flex items-center bg-white rounded-lg shadow-md p-3 border border-gray-100 w-full md:w-auto">
                                <span className="text-gray-800 font-mono text-base">
                                {moradorEncontrado.cpf}
                                </span>
                            </div>
                            </div>

                            <div className="flex flex-col gap-2">
                            <div className="flex items-center text-gray-700 font-bold text-base">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1.4C18.6 11.2 17.4 10 16 10H8c-1.4 0-2.6 1.2-3.6 2h-1.4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                                Veículos
                            </div>
                            <div className="flex flex-col gap-2">
                                {moradorEncontrado.veiculos.length > 0 ? (
                                    moradorEncontrado.veiculos.map((v, idx) => (
                                        <div key={idx} className="flex items-center bg-white rounded-lg shadow-md p-3 border border-gray-100 w-full md:w-auto">
                                            <span className="text-gray-800 font-medium">
                                            {v.modelo} - <span className="font-bold uppercase">{v.placa}</span>
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-gray-500 text-sm italic p-2">Nenhum veículo.</span>
                                )}
                            </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 mt-4 pt-4">
                            <h3 className="font-bold text-gray-700 mb-2">Outros moradores:</h3>
                            <ul className="text-gray-600 text-sm flex flex-wrap gap-x-4 gap-y-1 list-none p-0">
                            {moradorEncontrado.moradores.length > 0 ? (
                                moradorEncontrado.moradores.map((m, idx) => (
                                    <li key={idx}>• {m.nome}</li>
                                ))
                            ) : (
                                <li>Nenhum dependente cadastrado.</li>
                            )}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            ) : (
                 <div className="p-12 text-center text-gray-500">
                    {!isLoadingBusca && "Utilize a barra de pesquisa acima para visualizar os dados de um morador."}
                </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-20 py-8 px-4">
          
          <div className="w-full md:w-[490px] h-auto bg-white rounded-[10px] shadow-xl flex-shrink-0 p-6">
            <div className="flex justify-between flex-row items-center border-b border-gray-200 pb-4 mb-4">
              <h1 className="text-2xl font-medium px-4 pt-4">Controle de Acesso (Hoje)</h1>
              <div className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-4 mt-4">
                <h1 className="text-blue-700">{listaVisitantes.length} registrados</h1>
              </div>
            </div>

            <div className="flex flex-col space-y-4 max-h-[400px] overflow-y-auto">
              {listaVisitantes.length === 0 && <p className="text-gray-500 text-center py-4">Nenhuma visita registrada hoje.</p>}

              {listaVisitantes.map((visita) => {
                  const isDentro = visita.status === 'DENTRO' && !visita.dataSaida;
                  return (
                    <div key={visita.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                            ${isDentro ? 'bg-green-500' : 'bg-gray-400'}`
                        }>
                            {visita.nome.charAt(0)}
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-900">{visita.nome}</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-sm text-gray-500 font-medium">
                                    Casa {visita.numeroCasa}
                                </span>
                                {visita.placa && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-300 uppercase">
                                        🚗 {visita.placa}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">
                                {isDentro 
                                    ? `Entrou às ${new Date(visita.dataEntrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` 
                                    : `Saiu às ${new Date(visita.dataSaida!).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                                }
                            </p>
                        </div>
                        </div>
                        
                        <div className="flex space-x-2">
                        {isDentro ? (
                            <button 
                                onClick={() => handleRegistrarSaida(visita.id)}
                                className="px-3 py-1 text-xs font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition shadow-sm"
                            >
                                Registrar Saída
                            </button>
                        ) : (
                            <span className="px-3 py-1 text-xs font-medium rounded-lg text-gray-500 bg-gray-200">
                                Finalizado
                            </span>
                        )}
                        </div>
                    </div>
                  );
              })}
            </div>
          </div>

          <div className="w-full md:w-[490px] h-auto bg-white rounded-[10px] shadow-xl flex-shrink-0 p-6">
             <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200 mb-2">
                <h1 className="text-2xl font-medium text-gray-900">Log de Atividades</h1>
                <button onClick={carregarDadosIniciais} className="text-blue-600 text-sm hover:underline">Atualizar</button>
             </div>
             
             <ul className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {logs.map((log) => (
                    <li key={log.id} className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 transition duration-150">
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${log.tipo === 'VISITA' ? 'bg-green-400' : 'bg-blue-500'}`}></div>
                        <span className="text-base text-gray-800">
                        <span className="font-medium">{log.titulo}</span> - {log.subtitulo}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                        {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    </li>
                ))}
             </ul>
          </div>
        </div>

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
                  <img src="../ShieldVermelho.png" alt="Segurança" className="w-10 h-10" />
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
                  <img src="../Manager.png" alt="Síndico" className="w-10 h-10" />
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
                  <img src="../Maintenance.png" alt="Manutenção" className="w-10 h-10" />
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
                  <img src="../Businesswoman.png" alt="Zeladora" className="w-10 h-10" />
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
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}