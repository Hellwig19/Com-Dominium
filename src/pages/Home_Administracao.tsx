import { useState, useEffect, useCallback } from 'react';
 
import Footer from '../Components/footer';
import Header from "../Components/Header";
import DataAtual from '../Components/Data';
import ModalVot from '../Components/Modal_Votacao';
import ModalComu from '../Components/Modal_Comunicacao';
import api from '../services/api';
import ModalDetalhesCadastro from '../Components/Modal_DetalhesCadastro';

// --- Interfaces ---
interface Votacao {
  id: number;
  titulo: string;
  descricao: string;
  _count: { votos: number };
  opcoes: { 
    id: number; 
    texto: string; 
    _count: { votos: number } 
  }[];
}

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  residencias: { numeroCasa: string }[];
  createdAt: string;
}

const Administracao = () => {
  const [isVotacaoModalOpen, setIsVotacaoModalOpen] = useState(false);
  const [isComunicacaoModalOpen, setIsComunicacaoModalOpen] = useState(false);
  const [detalhesClienteId, setDetalhesClienteId] = useState<string | null>(null);

  const [adminName, setAdminName] = useState('Colaborador');
  const [votacoes, setVotacoes] = useState<Votacao[]>([]);
  const [moradores, setMoradores] = useState<Cliente[]>([]);
  const [pendentes, setPendentes] = useState<Cliente[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); 
  const [busca, setBusca] = useState('');

  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  // Função unificada para buscar tudo
  // showLoading = false por padrão para não piscar a tela no polling
  const refreshData = useCallback(async (showLoading = false) => {
    if (showLoading) setIsInitialLoading(true);

    try {
      // Faz as 3 chamadas em paralelo para ser mais rápido
      const [resVotacoes, resMoradores, resPendentes] = await Promise.all([
        api.get('/votacoes'),
        api.get('/clientes'),
        api.get('/clientes?pendentes=true')
      ]);

      setVotacoes(resVotacoes.data);
      setMoradores(resMoradores.data);
      setPendentes(resPendentes.data || []);

    } catch (error) {
      console.error('Erro ao atualizar dashboard:', error);
    } finally {
      if (showLoading) setIsInitialLoading(false);
    }
  }, []);

  // Effect único de inicialização e polling
  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) setAdminName(nomeSalvo.split(' ')[0]);

    // 1. Carga inicial (com spinner)
    refreshData(true);

    // 2. Atualização silenciosa a cada 10 segundos (aumentei de 5 para 10 para reduzir carga)
    const interval = setInterval(() => {
      refreshData(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [refreshData]);

  // Ações (Atualizam a lista manualmente após sucesso)
  const handleAprovar = async (id: string) => {
    if(!confirm("Tem certeza que deseja aprovar este cadastro?")) return;
    try {
      await api.patch(`/clientes/${id}/aprovar`);
      alert("Cliente aprovado com sucesso!");
      refreshData(false); 
    } catch (error) {
      alert("Erro ao aprovar cliente.");
    }
  };

  const handleRejeitar = async (id: string) => {
    if(!confirm("Tem certeza que deseja REJEITAR e EXCLUIR este cadastro?")) return;
    try {
      await api.delete(`/clientes/${id}/rejeitar`);
      alert("Cadastro rejeitado.");
      refreshData(false);
    } catch (error) {
      alert("Erro ao rejeitar cliente.");
    }
  };

  const getCasa = (cliente: Cliente) => {
    if (cliente.residencias && cliente.residencias.length > 0) {
      return cliente.residencias[0].numeroCasa;
    }
    return "S/N";
  };

  const handleAprovarWrapper = async (id: string) => {
    await handleAprovar(id);
    setDetalhesClienteId(null);
  };

  const handleRejeitarWrapper = async (id: string) => {
    await handleRejeitar(id);
    setDetalhesClienteId(null);
  };

  const moradoresFiltrados = moradores.filter((morador) => {
    const termo = busca.toLowerCase();
    const nome = morador.nome.toLowerCase();
    const casa = getCasa(morador).toLowerCase();
    return nome.includes(termo) || casa.includes(termo);
  });

  return (
    <>
      <header>
        <Header />
      </header>

      <ModalDetalhesCadastro 
         isOpen={!!detalhesClienteId}
         onClose={() => setDetalhesClienteId(null)}
         clienteId={detalhesClienteId}
         onAprovar={handleAprovarWrapper}
         onRejeitar={handleRejeitarWrapper}
       />
        <ModalVot isOpen={isVotacaoModalOpen} onClose={() => setIsVotacaoModalOpen(false)} />
        <ModalComu isOpen={isComunicacaoModalOpen} onClose={() => setIsComunicacaoModalOpen(false)} />

      <main className='bg-[#EAEAEA] min-h-screen'>
        <div className="bg-white flex flex-col items-center justify-center py-6 md:py-10">
          <div className="flex items-center justify-start w-[96%] max-w-[2300px] h-auto min-h-[150px] bg-gradient-to-r from-[#5e5ced] to-[#572486] rounded-xl p-6 md:p-10 shadow-lg">
            <div className="flex flex-col items-start text-white space-y-1">
              <h1 className="text-2xl md:text-[40px] font-semibold leading-tight m-0">
                 {getSaudacao()}, {adminName}
              </h1> 
              
              <h2 className="text-base md:text-[20px] opacity-90 m-0">Seja bem-vindo(a) ao painel da Administração</h2>
              <div className="flex items-center mt-4 md:mt-8">
                <img className="h-6 w-6 md:h-[30px] md:w-[30px]" src="../Calendar.png" alt="Calendário" />
                <h1 className="text-base md:text-[20px] ml-2 md:ml-[10px]"><DataAtual></DataAtual></h1>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4 md:p-8">
          <div className="bg-white w-full max-w-[2300px] h-auto rounded-xl p-4 md:p-10 shadow-lg flex flex-col gap-4 md:gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
              <a href="/reservas" className="w-full">
                <button className="w-full flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Account Male.png" alt="" className="w-8 h-8" /><span className="text-lg">Sistemas de Reserva</span>
                </button>
              </a>
              <a href="/manutencao" className="w-full">
                <button className="w-full flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Wrench.png" alt="" className="w-8 h-8" /><span className="text-lg">Manutenção/Sugestão</span>
                </button>
              </a>
            </div>
            <div className="flex justify-center gap-4 md:gap-10">
                <button onClick={() => setIsComunicacaoModalOpen(true)} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="" className="w-8 h-8" /><span className="text-lg">Novo Comunicado</span>
                </button>
                <button onClick={() => setIsVotacaoModalOpen(true)} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../PollAzul.png" alt="" className="w-8 h-8" /><span className="text-lg">Nova Votação</span>
                </button>
            </div>
          </div>
        </div>

        <div id="cadastrosPendentes" className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-6 md:p-10">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Cadastros Pendentes de Aprovação</h1>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs text-gray-500">Atualização em tempo real</span>
                </div>
            </div>

            {isInitialLoading && pendentes.length === 0 && (
              <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">Nenhum cadastro pendente no momento.</div>
            )}

            <div className="space-y-4 mt-4">
              {pendentes.map((cadastro) => (
                <div key={cadastro.id} className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h1 className="text-lg font-semibold text-gray-800">{cadastro.nome}</h1>
                      <div className="px-2 h-5 bg-amber-300 rounded-[5px] flex items-center justify-center">
                        <span className="text-yellow-800 text-xs font-bold">Pendente</span>
                      </div>
                    </div>
                    <h1 className="text-sm font-medium text-gray-700 mt-1">CPF: {cadastro.cpf} • Casa Nº <strong>{cadastro.residencias && cadastro.residencias.length > 0 ? cadastro.residencias[0].numeroCasa : 'S/N'}</strong></h1>
                    <h1 className="opacity-70 text-black text-xs font-medium mt-0.5">Solicitado em {new Date(cadastro.createdAt).toLocaleDateString('pt-BR')}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setDetalhesClienteId(cadastro.id)} className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition shadow-sm">
                      <img src="../View.png" alt="" className="w-4 h-4 mr-2" />Visualizar
                    </button>
                    <button onClick={async () => { await handleAprovar(cadastro.id); }} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition shadow-md">
                      <img src="../DoneBranco.png" alt="" className="w-4 h-4 mr-2" />Aprovar
                    </button>
                    <button onClick={async () => { await handleRejeitar(cadastro.id); }} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition shadow-md">
                      <img src="../MultiplyBranco.png" alt="" className="w-4 h-4 mr-2" />Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Moradores Cadastrados</h1>
            
            <div className="mb-8 max-w-lg">
               <input 
                 type="text" 
                 className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none" 
                 placeholder="Buscar por nome ou casa..." 
                 value={busca}
                 onChange={(e) => setBusca(e.target.value)} 
               />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200'>
              {moradoresFiltrados.length === 0 && (
                  <p className="text-gray-500 col-span-2 text-center py-4">Nenhum morador encontrado.</p>
              )}

              {moradoresFiltrados.slice(0, 10).map((morador) => (
                <div key={morador.id} className='bg-gray-50 p-4 rounded-lg flex items-center justify-between shadow-sm border border-gray-100 hover:bg-gray-100 transition'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl'>
                      {morador.nome.charAt(0)}
                    </div>
                    <div>
                      <h1 className='text-lg font-semibold text-gray-800'>{morador.nome}</h1>
                      <h1 className='text-sm text-gray-500'>Casa: {getCasa(morador)}</h1>
                      <h1 className='text-xs text-gray-400'>{morador.email}</h1>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Ativo</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[2300px]">
            <div className="w-full lg:flex-[3] bg-white rounded-2xl p-4 md:p-10 shadow-2xl flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Votações em andamento</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {votacoes.slice(0, 4).map((votacao) => {
                   const options = (votacao.opcoes || []).slice(0, 2);
                   const totalVotes = votacao._count?.votos || options.reduce((s, o) => s + (o?._count?.votos || 0), 0);
                   return (
                    <div key={votacao.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 rounded-xl shadow-md flex flex-col h-full">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-lg font-semibold text-gray-800">{votacao.titulo}</h2>
                        <span className="text-xs text-gray-500 mt-1">{totalVotes} votos</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{votacao.descricao}</p>

                      <div className="space-y-3">
                        {options
                          .slice()
                          .sort((a, b) => {
                            const aFavor = /favor/i.test(a?.texto || '');
                            const bFavor = /favor/i.test(b?.texto || '');
                            if (aFavor === bFavor) return 0;
                            return aFavor ? -1 : 1;
                          })
                          .map((op) => {
                            const count = op?._count?.votos || 0;
                            const percent = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                            const isFavor = /favor/i.test(op.texto || '');
                            const barColor = isFavor ? 'bg-green-500' : 'bg-red-500';
                            const iconSrc = isFavor ? '../Done.png' : '../Multiply.png';
                            return (
                              <div key={op.id} className="flex flex-col">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <img src={iconSrc} className="w-4 h-4" />
                                    <span className="text-sm font-medium text-gray-800">{op.texto}</span>
                                  </div>
                                  <div className="text-sm font-semibold text-gray-700">{count} • {percent}%</div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mt-2">
                                  <div className={`${barColor} h-2 rounded-full`} style={{ width: `${percent}%` }} />
                                </div>
                              </div>
                            );
                          })}
                      </div>

                    </div>
                   );
                })}
                {votacoes.length === 0 && <p className="text-gray-500">Nenhuma votação ativa.</p>}
              </div>
            </div>

            <div className="w-full lg:flex-[1] max-w-[420px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Resumo Financeiro</h1>
              <div className="flex flex-col gap-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-green-700 text-sm">Receita mensal</p>
                  <p className="text-green-600 text-xl">R$ 135.269,00 ↑</p>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-red-700 text-sm">Despesas mensais</p>
                  <p className="text-red-600 text-xl">R$ 45.269,00 ↓</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-blue-700 text-sm">Saldo disponível</p>
                  <p className="text-blue-700 text-xl">R$ 90.000,00</p>
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
};

export default Administracao;