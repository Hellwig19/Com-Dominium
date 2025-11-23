import React, { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';
import ModalCad from '../Components/Modal_CadastrarVis';
import ModalUltimosAcessos from '../Components/Modal_UltimosAcessos';
import api from '../services/api';
import ChatWidget from '../Components/ChatWidget';

interface Visitante {
  id: number | string;
  nome: string;
  cpf: string;
  numeroCasa: string; 
  placa?: string | null;
  status: 'DENTRO' | 'SAIU' | 'AGENDADO'; 
  dataEntrada?: string;
  dataSaida?: string | null;
  horario?: string; 
  observacoes?: string; 
  tipoOriginal?: string; 
}

interface FeedItem {
  id: string;
  tipo: string;
  titulo: string;
  subtitulo: string;
  timestamp: string;
}

interface AutorizacaoAgendada {
    id: number;
    tipo: 'VISITA' | 'PRESTADOR';
    nome: string;
    data: string;
    horario: string;
}

interface VisitaAtivaLocal {
    id: number | string;
    nome: string;
    dataEntrada: string;
    cpf?: string;
}

interface MoradorBusca {
  id: string;
  nome: string;
  cpf: string;
  telefone?: string; 
  residencias: { id: number; numeroCasa: string; rua?: string }[]; 
  veiculos: { placa: string; modelo: string }[];
  moradores: { nome: string }[]; 
  visitasAtivas?: VisitaAtivaLocal[];
  autorizacoesAgendadas?: AutorizacaoAgendada[]; 
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

  const [visitanteParaCadastro, setVisitanteParaCadastro] = useState<Visitante | null>(null);

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) setPorteiroNome(nomeSalvo.split(' ')[0]);

    carregarDadosIniciais();

    const interval = setInterval(carregarDadosIniciais, 15000);
    return () => clearInterval(interval);
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

  const handleOpenVisitanteModal = () => {
    setVisitanteParaCadastro(null); 
    setIsVisitanteModalOpen(true);
  };

  const handleCloseVisitanteModal = () => {
    setIsVisitanteModalOpen(false);
    setVisitanteParaCadastro(null); 
    carregarDadosIniciais();
  };

  const handlePuxarDadosAgendados = (item: Visitante) => {
    setVisitanteParaCadastro(item); 
    setIsVisitanteModalOpen(true);
  };

  const handleOpenUltimosAcessos = () => setIsUltimosAcessosOpen(true);
  const handleCloseUltimosAcessos = () => setIsUltimosAcessosOpen(false);

  const handleRegistrarSaida = async (id: number | string) => {
      if (!confirm("Confirmar saída do visitante?")) return;
      try {
          await api.patch(`/visitantes/${id}/saida`);
          carregarDadosIniciais(); 
      } catch (error) {
          alert("Erro ao registrar saída.");
      }
  };

  const formatCPF = (cpf: string) => {
    if (!cpf) return "---";
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatPhone = (phone: any) => {
    if (!phone) return "Não cadastrado";
    const strPhone = String(phone).replace(/\D/g, '');
    if (strPhone.length === 11) {
        return strPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (strPhone.length === 10) {
        return strPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return strPhone; 
  };

  const handleBuscarMorador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termoBusca) return;

    setIsLoadingBusca(true);
    setMoradorEncontrado(null);

    try {
      const res = await api.get('/clientes'); 
      const clientes: any[] = res.data;

      const termoLower = termoBusca.toLowerCase();
      const encontrado = clientes.find((c: any) => {
        const nomeMatch = c.nome && c.nome.toLowerCase().includes(termoLower);
        const cpfMatch = c.cpf && c.cpf.includes(termoBusca);
        const casaMatch = c.residencias && Array.isArray(c.residencias) && c.residencias.some((r: any) => String(r.numeroCasa).toLowerCase().includes(termoLower));
        return nomeMatch || cpfMatch || casaMatch;
      });

      if (encontrado) {
        const resDetalhes = await api.get(`/clientes/${encontrado.id}`);
        const dadosMorador = resDetalhes.data;

        const casaMorador = dadosMorador.residencias[0]?.numeroCasa;
        const residenciaId = dadosMorador.residencias[0]?.id; 

        const visitasDesteMorador: VisitaAtivaLocal[] = listaVisitantes
            .filter(v => v.numeroCasa === casaMorador && v.status === 'DENTRO')
            .map(v => ({ id: v.id, nome: v.nome, cpf: v.cpf, dataEntrada: v.dataEntrada! }));

        let agendamentos: AutorizacaoAgendada[] = []; 
        
        if (residenciaId) {
            try {
                const [resVisitas, resPrestadores] = await Promise.all([
                    api.get(`/visitas/residencia/${residenciaId}`),
                    api.get(`/prestadores/residencia/${residenciaId}`)
                ]);
                
                const visitasFuturas = resVisitas.data
                    .filter((v: any) => v.status === 'AGENDADA') 
                    .map((v: any) => ({
                        id: v.id,
                        tipo: 'VISITA',
                        nome: v.nome,
                        data: new Date(v.dataVisita).toLocaleDateString('pt-BR'),
                        horario: v.horario
                    }));

                const prestadoresFuturos = resPrestadores.data
                    .filter((p: any) => p.status === 'AGENDADA')
                    .map((p: any) => ({
                        id: p.id,
                        tipo: 'PRESTADOR',
                        nome: p.nome,
                        data: new Date(p.dataServico).toLocaleDateString('pt-BR'),
                        horario: p.horario
                    }));

                agendamentos = [...visitasFuturas, ...prestadoresFuturos];

            } catch (err) {
                console.log("Aviso: Não foi possível buscar agendamentos.");
            }
        }

        let telefoneDisplay = dadosMorador.telefone;
        if (!telefoneDisplay && dadosMorador.contatos && dadosMorador.contatos.length > 0) {
            telefoneDisplay = dadosMorador.contatos[0].telefone;
        }

        setMoradorEncontrado({
            ...dadosMorador,
            telefone: telefoneDisplay,
            visitasAtivas: visitasDesteMorador,
            autorizacoesAgendadas: agendamentos
        });

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

  const listaExibicao = listaVisitantes
    .filter(v => v.status !== 'SAIU')
    .sort((a, b) => {
      if (a.status === 'AGENDADO' && b.status !== 'AGENDADO') return -1;
      if (a.status !== 'AGENDADO' && b.status === 'AGENDADO') return 1;
      
      const horaA = a.horario || '';
      const horaB = b.horario || '';
      return horaA.localeCompare(horaB);
    });

  return (
    <>
      <header>
        <Header />
      </header>

      <ModalCad
        isOpen={isVisitanteModalOpen}
        onClose={handleCloseVisitanteModal}
        dadosIniciais={visitanteParaCadastro} 
      />

      <ModalUltimosAcessos 
        isOpen={isUltimosAcessosOpen}
        onClose={handleCloseUltimosAcessos}
        visitantes={listaVisitantes.filter(v => typeof v.id === 'number')} 
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
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-sm border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="Encomendas" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                  <span className="text-base md:text-[22px]">Encomendas</span>
                </button>
              </a>
              
              <button
                onClick={handleOpenVisitanteModal}
                className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-sm border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                <img src="../Account Male.png" alt="Cadastrar Visitante" className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]" />
                <span className="text-base md:text-[22px]">Cadastrar Entrada</span>
              </button>
              <button 
                onClick={handleOpenUltimosAcessos}
                className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-sm border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
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
                        placeholder="Buscar por nome ou nº da casa..." 
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
                             <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50 shadow-md">
                                 <span className="text-2xl font-bold">{moradorEncontrado.nome.charAt(0)}</span>
                             </div>
                             <div>
                                <h2 className="text-xl md:text-2xl font-bold leading-tight">
                                    {moradorEncontrado.nome}
                                </h2>
                                <p className="text-white/80 text-sm font-medium">Proprietário Principal</p>
                             </div>
                         </div>
                         <div className="text-right">
                            <span className="block text-sm text-white/80 uppercase tracking-wide">Endereço</span>
                            <span className="text-lg md:text-xl font-bold">
                                Casa {moradorEncontrado.residencias[0]?.numeroCasa || "S/N"}
                            </span>
                            <span className="block text-xs text-white/90">
                                {moradorEncontrado.residencias[0]?.rua || "Rua Principal"}
                            </span>
                         </div>
                         </div>
 
                         <div className="bg-white rounded-b-xl shadow-xl p-6 md:p-8 relative z-10 mt-[-20px] mx-4 border border-gray-100">
                            
                            {moradorEncontrado.visitasAtivas && moradorEncontrado.visitasAtivas.length > 0 && (
                                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg animate-pulse-slow">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3 w-full">
                                            <h3 className="text-sm font-bold text-red-800">
                                                Atenção: {moradorEncontrado.visitasAtivas.length} Visita(s) na Unidade Agora
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <ul className="list-disc pl-5 space-y-1">
                                                    {moradorEncontrado.visitasAtivas.map(v => (
                                                        <li key={v.id}>
                                                            <strong>{v.nome}</strong> (Entrou às {new Date(v.dataEntrada).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})})
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#5e5ced]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        <h3 className="font-bold text-gray-700">Dados Pessoais</h3>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">CPF</p>
                                            <p className="text-gray-800 font-mono bg-gray-50 p-2 rounded border border-gray-200 inline-block">
                                                {formatCPF(moradorEncontrado.cpf)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase">Telefone / Contato</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-gray-800 font-medium text-lg">
                                                    {formatPhone(moradorEncontrado.telefone)}
                                                </p>
                                                <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold border border-green-200">WhatsApp</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#5e5ced]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-1.4C18.6 11.2 17.4 10 16 10H8c-1.4 0-2.6 1.2-3.6 2h-1.4c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                                        <h3 className="font-bold text-gray-700">Veículos ({moradorEncontrado.veiculos.length})</h3>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                                        {moradorEncontrado.veiculos.length > 0 ? (
                                            moradorEncontrado.veiculos.map((v, idx) => (
                                                <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200 hover:border-[#5e5ced] transition-colors">
                                                    <span className="text-gray-600 text-sm font-medium">{v.modelo}</span>
                                                    <span className="font-bold font-mono text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-300">{v.placa}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-400 text-sm italic p-2 bg-gray-50 rounded border border-dashed border-gray-200 text-center">
                                                Nenhum veículo cadastrado.
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#5e5ced]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                        <h3 className="font-bold text-gray-700">Residentes</h3>
                                    </div>
                                    <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 mb-4">
                                        {moradorEncontrado.moradores.length > 0 ? (
                                            moradorEncontrado.moradores.map((m, idx) => (
                                                <li key={idx} className="flex items-center text-sm text-gray-600 bg-white p-2 rounded border border-gray-100">
                                                    <div className="w-2 h-2 bg-[#5e5ced] rounded-full mr-2"></div>
                                                    {m.nome}
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-gray-400 text-sm italic p-2">Nenhum dependente.</li>
                                        )}
                                    </ul>

                                    <div className="flex items-center gap-2 pb-2 border-b border-gray-100 mt-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <h3 className="font-bold text-gray-700">Agendamentos Futuros</h3>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-2">
                                        {moradorEncontrado.autorizacoesAgendadas && moradorEncontrado.autorizacoesAgendadas.length > 0 ? (
                                            moradorEncontrado.autorizacoesAgendadas.map((ag, idx) => (
                                                <div key={idx} className="bg-orange-50 rounded-lg p-2 border border-orange-100 flex flex-col">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className={`text-[10px] font-bold px-1.5 rounded text-white ${ag.tipo === 'VISITA' ? 'bg-blue-400' : 'bg-orange-400'}`}>
                                                            {ag.tipo}
                                                        </span>
                                                        <span className="text-xs text-gray-500">{ag.data} - {ag.horario}</span>
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-800 truncate">{ag.nome}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-400 text-sm italic p-2 text-center">
                                                Nenhuma autorização pendente.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
                ) : (
                    <div className="p-12 flex flex-col items-center justify-center text-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                        <p className="text-gray-500 text-lg font-medium">Pesquise um morador para ver os detalhes.</p>
                        <p className="text-gray-400 text-sm mt-1">Você pode buscar por nome, CPF ou número da casa.</p>
                    </div>
                )}
             </div>
        </div>

        <div className="flex flex-col xl:flex-row items-start justify-center gap-6 md:gap-10 py-8 px-6 w-full max-w-[1500px] mx-auto">
          
          <div className="w-full xl:w-1/2 h-auto bg-white rounded-xl shadow-xl flex-shrink-0 overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold tracking-tight text-white">Controle de Acesso</h1>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-white/20 text-white backdrop-blur-sm">
                {listaExibicao.length} ativos
              </div>
            </div>

          

            <div className="flex flex-col space-y-4 max-h-[550px] overflow-y-auto p-6 bg-gray-50">
              {listaExibicao.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-lg font-medium">Nenhum movimento ativo.</p>
                    <p className="text-sm">Agendamentos e pessoas no local aparecerão aqui.</p>
                 </div>
              )}

              {listaExibicao.map((visita) => {
                  const isAgendado = visita.status === 'AGENDADO';
                  const isDentro = visita.status === 'DENTRO';
                  const tipoTexto = visita.tipoOriginal || 'VISITA';
                  
                  let cardBg = 'bg-white border-gray-100';
                  let avatarBg = 'bg-gray-400';
                  let statusColor = 'text-gray-500';
                  let statusBg = 'bg-gray-100';

                  if (isDentro) {
                      avatarBg = 'bg-green-500';
                      statusColor = 'text-green-700';
                      statusBg = 'bg-green-100';
                  }
                  if (isAgendado) {
                      avatarBg = 'bg-yellow-500';
                      cardBg = 'bg-yellow-50 border-yellow-200 shadow-sm';
                      statusColor = 'text-yellow-800';
                      statusBg = 'bg-yellow-100';
                  }

                  return (
                    <div key={visita.id} className={`flex flex-col p-4 border rounded-xl transition duration-150 hover:shadow-md ${cardBg}`}>
                        
                        <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0 text-lg ${avatarBg}`}>
                                    {visita.nome.charAt(0)}
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-lg font-bold text-gray-900">{visita.nome}</p>
                                        {isAgendado && (
                                            <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-300 font-bold uppercase tracking-wider">
                                                {tipoTexto}
                                            </span>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                        <span className="flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded">
                                            🏠 Casa {visita.numeroCasa}
                                        </span>
                                        {visita.placa ? (
                                            <span className="flex items-center gap-1 font-mono font-bold uppercase bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                                🚗 {visita.placa}
                                            </span>
                                        ) : isAgendado && (
                                            <span className="text-xs text-gray-400 italic flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                Sem placa
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pl-[64px] flex flex-col gap-2">
                             <div className="flex items-center justify-between text-sm">
                                <div className="flex flex-col gap-1">
                                    {isAgendado ? (
                                        <p className="text-gray-700 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            Previsão: <span className="font-semibold">{visita.horario}</span>
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                            Entrou: <span className="font-semibold">{visita.dataEntrada ? new Date(visita.dataEntrada).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '--:--'}</span>
                                        </p>
                                    )}
                                </div>
                                
                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusBg} ${statusColor}`}>
                                    {isAgendado ? 'Aguardando' : 'Na Unidade'}
                                </span>
                             </div>

                             {isAgendado && visita.observacoes && (
                                <div className="bg-yellow-100/50 p-3 rounded-lg border border-yellow-200/50 mt-1">
                                    <p className="text-xs text-gray-700">
                                        <span className="font-bold flex items-center gap-1 mb-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
                                            Observação do Morador:
                                        </span> 
                                        "{visita.observacoes}"
                                    </p>
                                </div>
                             )}
                        </div>
                        
                        <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-100/50 pl-[64px]">
                            <div className="flex gap-3 w-full">
                                {isAgendado && (
                                    <button 
                                        onClick={() => handlePuxarDadosAgendados(visita)}
                                        className="flex-1 px-4 py-2.5 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition shadow-md flex items-center justify-center gap-2 group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Recepcionar e Liberar Entrada
                                    </button>
                                )}

                                {isDentro && (
                                    <button 
                                        onClick={() => handleRegistrarSaida(visita.id)}
                                        className="flex-1 px-4 py-2.5 text-sm font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition shadow-md flex items-center justify-center gap-2 group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                        Registrar Saída
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                  );
              })}
            </div>
          </div>

          <div className="w-full xl:w-1/2 h-auto bg-white rounded-xl shadow-xl flex-shrink-0 overflow-hidden border border-gray-100">
             <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight text-white">Log de Atividades Recentes</h1>
                <button onClick={carregarDadosIniciais} className="text-blue-300 text-sm hover:text-white transition flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Atualizar
                </button>
             </div>
             
             <ul className="divide-y divide-gray-100 max-h-[550px] overflow-y-auto p-0 bg-gray-50">
                {logs.map((log) => (
                    <li key={log.id} className="flex items-center justify-between py-4 px-6 hover:bg-white transition duration-150">
                    <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${log.tipo === 'VISITA' ? 'bg-green-500 shadow-sm shadow-green-200' : 'bg-blue-500 shadow-sm shadow-blue-200'}`}></div>
                        <span className="text-base text-gray-800">
                        <span className="font-bold">{log.titulo}</span> 
                        <span className="text-gray-400 mx-1">•</span> 
                        <span className="text-gray-600">
                            {log.subtitulo.split(' - ')[0]}
                        </span>
                        </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
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
      <ChatWidget />
    </>
  );
}