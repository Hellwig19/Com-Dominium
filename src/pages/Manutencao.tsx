import { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';
import api from '../services/api';
import ModalVot from '../Components/Modal_Votacao';
import ModalComu from '../Components/Modal_Comunicacao';
import { AxiosError } from 'axios';

// Interfaces atualizadas para refletir o novo banco de dados
interface Sugestao {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  lido: boolean;
  cliente?: {
    nome: string;
    residencias?: { numeroCasa: string }[];
  };
}

interface ManutencaoItem {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';
  prioridade: boolean;
  cliente?: {
    nome: string;
    residencias?: { numeroCasa: string }[];
  };
}

interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  tipo: 'URGENTE' | 'NORMAL';
  data: string;
}

export default function Manutencao() {
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [manutencoes, setManutencoes] = useState<ManutencaoItem[]>([]);
  const [avisosUrgentes, setAvisosUrgentes] = useState<Aviso[]>([]);
  
  const [isComunicacaoModalOpen, setIsComunicacaoModalOpen] = useState(false);
  const [isVotacaoModalOpen, setIsVotacaoModalOpen] = useState(false);
  const [showRead, setShowRead] = useState(false); // Alterna entre pendentes e histórico
  
  const [adminName, setAdminName] = useState('Colaborador');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 1. Busca Sugestões
      try {
        const resSug = await api.get('/sugestoes', config);
        setSugestoes(resSug.data);
      } catch (e) { console.error('Erro sugestões:', e); }

      // 2. Busca Manutenções (NOVA ROTA)
      try {
        const resManut = await api.get('/manutencoes', config);
        setManutencoes(resManut.data);
      } catch (e) { console.error('Erro manutenções:', e); }

      // 3. Busca Avisos Urgentes
      try {
        const resAvisos = await api.get('/avisos', config);
        const urgentes = resAvisos.data.filter((a: Aviso) => a.tipo === 'URGENTE');
        setAvisosUrgentes(urgentes);
      } catch (e) { console.error("Erro avisos:", e); }

    } catch (error) {
      console.error("Erro geral:", error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) setAdminName(nomeSalvo.split(' ')[0]);

    fetchData(true);
    const intervalId = setInterval(() => { fetchData(false); }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Ação: Arquivar Sugestão (Apenas marca lido)
  const arquivarSugestao = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/sugestoes/${id}/lido`, { lido: true }, { headers: { Authorization: `Bearer ${token}` } });
      setSugestoes(prev => prev.map(s => s.id === id ? { ...s, lido: true } : s));
    } catch (e) { alert('Erro ao arquivar.'); }
  };

  // Ação: Concluir Manutenção (Envia Notificação ao Mobile)
  const concluirManutencao = async (id: number) => {
    if(!confirm("Confirmar conclusão? O morador será notificado.")) return;
    try {
      const token = localStorage.getItem('token');
      await api.patch(`/manutencoes/${id}/concluir`, {}, { headers: { Authorization: `Bearer ${token}` } });
      fetchData(false); 
      alert("Manutenção concluída e notificação enviada!");
    } catch (e) { alert('Erro ao concluir.'); }
  };

  // Ação: Priorizar Manutenção (Toggle Boolean)
  const togglePrioridade = async (item: ManutencaoItem) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const newPrior = !item.prioridade;

      // 1) Toggle prioridade on server
      await api.patch(`/manutencoes/${item.id}/prioridade`,
        { prioridade: newPrior },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2) Atualização otimista local da lista de manutenções
      setManutencoes(prev => prev.map(m => m.id === item.id ? { ...m, prioridade: newPrior } : m));

      // 3) Se marcamos como prioridade agora, criar um aviso URGENTE e adicioná-lo aos avisosUrgentes
      if (newPrior) {
        try {
          const payload = {
            titulo: `Prioridade: ${item.titulo}`,
            descricao: item.descricao || 'Solicitação de manutenção priorizada',
            tipo: 'URGENTE',
            data: new Date().toISOString(),
          } as any;

          const res = await api.post('/avisos', payload, { headers: { Authorization: `Bearer ${token}` } });
          // Se o servidor retornar o aviso criado, acrescentar à lista de avisos urgentes
          if (res?.data) {
            setAvisosUrgentes(prev => [res.data, ...(prev || [])]);
          }
        } catch (err) {
          console.error('Erro criando aviso urgente:', err);
          alert('Prioridade aplicada, mas falha ao criar aviso urgente no servidor.');
        }
      }
    } catch (e) { alert('Erro ao mudar prioridade.'); }
  };

  const deleteAviso = async (id: number) => {
      if (!confirm('Confirmar exclusão deste alerta?')) return;
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/avisos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setAvisosUrgentes(prev => prev.filter(a => a.id !== id));
      } catch (err) { alert('Erro ao excluir aviso.'); }
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  const timeAgo = (isoString: string) => {
      const diffMs = new Date().getTime() - new Date(isoString).getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays > 0) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
      return "Hoje";
  };

  const getCasa = (obj: any) => {
    if (obj.cliente?.residencias?.length > 0) return `Casa ${obj.cliente.residencias[0].numeroCasa}`;
    return "S/N";
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  // Filtros
  const manutencoesPendentes = manutencoes.filter(m => m.status !== 'CONCLUIDO');
  const sugestoesPendentes = sugestoes.filter(s => !s.lido);
  
  // Histórico
  const manutencoesConcluidas = manutencoes.filter(m => m.status === 'CONCLUIDO');
  const sugestoesLidas = sugestoes.filter(s => s.lido);

  return (
    <>
      <header><Header /></header>
      <ModalVot isOpen={isVotacaoModalOpen} onClose={() => setIsVotacaoModalOpen(false)} />
      <ModalComu isOpen={isComunicacaoModalOpen} onClose={() => setIsComunicacaoModalOpen(false)} />
      
      <main className='bg-[#EAEAEA] min-h-screen'>
        {/* Botões Superiores */}
        <div className='bg-white flex justify-center items-center py-4 space-x-6 shadow-md'>
          <a href="/admin">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
              <img className="mr-2 h-5 w-5" src="./Home.png" alt="" /> Inicio
            </button>
          </a>
          <button onClick={() => setIsComunicacaoModalOpen(true)} className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
            <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="" /> Comunicação
          </button>
          <button onClick={() => setIsVotacaoModalOpen(true)} className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
            <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="" /> Votação
          </button>
        </div>

        {/* Banner de Saudação */}
        <div className="bg-white flex flex-col items-center justify-center py-8 md:py-10 shadow-lg">
          <div className="flex items-center justify-start w-[90%] max-w-[2300px] h-auto min-h-[160px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-2xl p-6 md:p-12 shadow-xl">
            <div className="flex flex-col items-start text-white space-y-2 md:space-y-3">
              <h1 className="text-2xl md:text-4xl font-semibold leading-tight m-0">{getSaudacao()}, {adminName}</h1>
              <h2 className="text-base md:text-xl opacity-90 m-0">Painel de Zeladoria e Manutenção</h2>
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-8 md:w-8" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-xl ml-2 md:ml-3"><DataAtual /></h1> 
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-start px-4 md:px-6 mt-8 pb-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-8 w-full max-w-[2300px]">

            {/* Coluna Principal */}
            <div className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
              
              <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
                <div className='flex items-center gap-2'>
                  <img className="h-7 w-7" src="./Chat.png" alt="Ícone" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">Solicitações</h1>
                </div>
                <div className='flex items-center gap-1'>
                  <button onClick={() => setShowRead((s) => !s)} className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-2">
                    {showRead ? 'Ocultar Histórico' : 'Ver Histórico'}
                    <img className={`h-4 w-4 transition-transform ${showRead ? 'rotate-90' : ''}`} src="./Right.png" alt="Seta" />
                  </button>
                </div>
              </div>

              {isLoading && <p className="text-gray-500 text-center">Carregando...</p>}
              {!isLoading && manutencoesPendentes.length === 0 && sugestoesPendentes.length === 0 && (
                 <div className="p-4 bg-gray-50 rounded text-center text-gray-500">Nenhuma solicitação ativa no momento.</div>
              )}

              {/* LISTA 1: MANUTENÇÃO (VERMELHO) */}
              {manutencoesPendentes.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                        Manutenção / Reparos
                    </h3>
                    <div className="flex flex-col space-y-4">
                        {manutencoesPendentes.map((item) => (
                            <div key={item.id} className={`flex w-full p-4 md:p-5 bg-red-50 rounded-xl shadow-sm border ${item.prioridade ? 'border-red-500 border-l-4' : 'border-red-100'} hover:shadow-md transition-shadow`}>
                                <div className="h-10 w-10 md:h-12 md:w-12 bg-red-200 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-red-700 font-bold">
                                    {item.cliente?.nome?.charAt(0) || 'M'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-gray-800 text-sm md:text-base">
                                                {item.cliente?.nome || 'Anônimo'} - {getCasa(item)}
                                            </span>
                                            {item.prioridade && (
                                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">
                                                  PRIORIDADE ALTA
                                              </span>
                                            )}
                                            {!item.prioridade && (
                                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                  Manutenção
                                              </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{timeAgo(item.data)}</span>
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium mb-1">{item.titulo}</p>
                                    <p className="text-sm text-gray-700 mb-3">{item.descricao}</p>

                                    <div className="flex justify-between items-center pt-2 border-t border-red-200/50">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-600 border border-gray-200">
                                            Ação Necessária
                                        </span>
                                        <div className="flex space-x-4 text-sm font-medium">
                                            <button onClick={() => concluirManutencao(item.id)} className="flex items-center text-green-700 hover:text-green-900">
                                                <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Marcar" />
                                                Concluir e Notificar
                                            </button>
                                            <button onClick={() => togglePrioridade(item)} className="flex items-center text-orange-600 hover:text-orange-800">
                                                <img className="h-4 w-4 mr-1" src="./Error.png" alt="Priorizar" />
                                                {item.prioridade ? 'Remover Prioridade' : 'Priorizar'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Separador */}
              {manutencoesPendentes.length > 0 && sugestoesPendentes.length > 0 && <hr className="border-gray-200 my-6" />}

              {/* LISTA 2: SUGESTÕES GERAIS (AZUL) */}
              {sugestoesPendentes.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        Sugestões Gerais e Diversos
                    </h3>
                    <div className="flex flex-col space-y-4">
                        {sugestoesPendentes.map((sug) => (
                            <div key={sug.id} className="flex w-full p-4 md:p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-blue-700 font-bold">
                                    {sug.cliente?.nome?.charAt(0) || 'S'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-gray-800 text-sm md:text-base">
                                                {sug.cliente?.nome || 'Anônimo'} - {getCasa(sug)}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Sugestão
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{timeAgo(sug.data)}</span>
                                    </div>
                                    <p className="text-sm text-gray-900 font-medium mb-1">{sug.titulo}</p>
                                    <p className="text-sm text-gray-700 mb-3">{sug.descricao}</p>

                                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Geral
                                        </span>
                                        <div className="flex space-x-4 text-sm font-medium">
                                            <button onClick={() => arquivarSugestao(sug.id)} className="flex items-center text-gray-600 hover:text-gray-800">
                                                <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Marcar" />
                                                Arquivar (Lido)
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* LISTA DE ITENS JÁ LIDOS (HISTÓRICO) */}
              {showRead && (
                <div className="mt-8 bg-white rounded-lg p-4 border border-gray-100">
                  <h2 className="text-lg font-semibold mb-3 text-gray-400">Histórico (Concluídos/Lidos)</h2>
                  
                  {manutencoesConcluidas.length === 0 && sugestoesLidas.length === 0 && (
                      <p className="text-sm text-gray-500">Nenhum histórico disponível.</p>
                  )}

                  <div className="space-y-3 opacity-60 hover:opacity-100 transition-opacity">
                    {/* Histórico Manutenções */}
                    {manutencoesConcluidas.map(m => (
                        <div key={`hist-m-${m.id}`} className="flex w-full p-3 bg-red-50/50 rounded-md border border-red-100">
                           <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-800">{m.cliente?.nome}</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Concluído</span>
                              </div>
                              <p className="text-sm text-gray-700 line-through">{m.titulo}</p>
                           </div>
                        </div>
                    ))}
                    {/* Histórico Sugestões */}
                    {sugestoesLidas.map(s => (
                        <div key={`hist-s-${s.id}`} className="flex w-full p-3 bg-gray-50 rounded-md border border-gray-100">
                           <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-gray-800">{s.cliente?.nome}</span>
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-600">Arquivado</span>
                              </div>
                              <p className="text-sm text-gray-700 line-through">{s.titulo}</p>
                           </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna Lateral: Alertas */}
            <div className="w-full lg:w-[450px] bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col h-fit sticky top-4">
              <div className='flex items-center gap-2 mb-6 border-b pb-4 border-gray-200'>
                <img className='h-7 w-7' src="./Error.png" alt="" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Alertas Prioritários
                </h1>
              </div>

              <div className="flex flex-col gap-4 text-sm">
                {!isLoading && avisosUrgentes.length === 0 && (
                    <div className="p-4 bg-green-50 rounded text-center text-green-700 border border-green-200">
                        Tudo certo! Nenhuma urgência ativa.
                    </div>
                )}

                {avisosUrgentes.map((aviso) => (
                  <div key={aviso.id} className="flex bg-red-50 border-l-4 border-red-500 p-4 rounded-xl shadow-sm hover:scale-[1.01] transition-all items-center justify-between">
                    <div className="flex flex-col">
                      <p className="font-bold text-red-700 text-base md:text-lg">{aviso.titulo}</p>
                      <p className="text-red-600 text-sm line-clamp-1">{aviso.descricao}</p>
                      <p className="text-red-400 text-xs mt-1">{formatDate(aviso.data)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => deleteAviso(aviso.id)}
                        className="text-sm text-red-600 hover:text-red-800 bg-white border border-red-200 px-3 py-1 rounded-md shadow-sm"
                      >
                        Excluir
                      </button>
                      <div className='bg-red-600 rounded-full px-4 py-1 text-white flex-shrink-0'>
                        <h1 className="text-xs font-semibold uppercase">Urgente</h1>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer><Footer /></footer>
    </>
  );
}