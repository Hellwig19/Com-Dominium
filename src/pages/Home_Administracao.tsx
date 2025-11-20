import { useState, useEffect } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

interface AreaComumBackend {
  id: number;
  nome: string;
  capacidade: number;
  preco: number;
  statusConfig: 'ATIVO' | 'MANUTENCAO' | 'INATIVO' | 'OCUPADO';
  statusHoje: string; 
}

const Administracao = () => {
  const [isVotacaoModalOpen, setIsVotacaoModalOpen] = useState(false);
  const [isComunicacaoModalOpen, setIsComunicacaoModalOpen] = useState(false);
  const [detalhesClienteId, setDetalhesClienteId] = useState<string | null>(null);

  const [areaParaEditar, setAreaParaEditar] = useState<AreaComumBackend | null>(null);
  const [formArea, setFormArea] = useState({ 
      nome: '', 
      preco: '', 
      capacidade: '', 
      status: 'ATIVO' 
  });

  const [value, setValue] = useState(new Date()); 
  const [adminName, setAdminName] = useState('Colaborador');
  const [votacoes, setVotacoes] = useState<Votacao[]>([]);
  const [moradores, setMoradores] = useState<Cliente[]>([]);
  const [pendentes, setPendentes] = useState<Cliente[]>([]);
  const [busca, setBusca] = useState('');
  const [areas, setAreas] = useState<AreaComumBackend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false); 


  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [resVotacoes, resMoradores, resPendentes] = await Promise.all([
        api.get('/votacoes'),
        api.get('/clientes'),
        api.get('/clientes?pendentes=true'),
      ]);
      setVotacoes(resVotacoes.data);
      setMoradores(resMoradores.data);
      setPendentes(resPendentes.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAreasPorData = async (dataSelecionada: Date) => {
      try {
          setIsLoadingAreas(true);
          const ano = dataSelecionada.getFullYear();
          const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
          const dia = String(dataSelecionada.getDate()).padStart(2, '0');
          const dataString = `${ano}-${mes}-${dia}`;

          const response = await api.get(`/areas/status-dia?data=${dataString}`);
          setAreas(response.data);
      } catch (error) {
          console.error("Erro ao buscar status das áreas:", error);
      } finally {
          setIsLoadingAreas(false);
      }
  };

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) {
        setAdminName(nomeSalvo.split(' ')[0]);
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (value) {
        fetchAreasPorData(value);
    }
  }, [value]); 

  const handleAprovar = async (id: string) => {
    if(!confirm("Tem certeza que deseja aprovar este cadastro?")) return;
    try {
      await api.patch(`/clientes/${id}/aprovar`);
      alert("Cliente aprovado com sucesso!");
      fetchInitialData(); 
    } catch (error) {
      alert("Erro ao aprovar cliente.");
    }
  };

  const handleRejeitar = async (id: string) => {
    if(!confirm("Tem certeza que deseja REJEITAR e EXCLUIR este cadastro?")) return;
    try {
      await api.delete(`/clientes/${id}/rejeitar`);
      alert("Cliente rejeitado.");
      fetchInitialData();
    } catch (error) {
      alert("Erro ao rejeitar cliente.");
    }
  };

  const abrirModalArea = (area: AreaComumBackend) => {
    setAreaParaEditar(area);
    setFormArea({
        nome: area.nome,
        preco: String(area.preco),
        capacidade: String(area.capacidade),
        status: area.statusConfig
    });
  };

  const salvarArea = async () => {
      if (!areaParaEditar) return;

      const precoString = String(formArea.preco).replace(',', '.');
      const capacidadeString = String(formArea.capacidade).replace(',', '.');

      const precoNumber = parseFloat(precoString);
      const capacidadeNumber = parseFloat(capacidadeString);

      if (isNaN(precoNumber) || isNaN(capacidadeNumber)) {
          alert("Erro: O preço e a capacidade devem ser números válidos.");
          return;
      }

      try {
          await api.put(`/areas/${areaParaEditar.id}`, {
              nome: formArea.nome,
              preco: precoNumber,
              capacidade: capacidadeNumber,
              status: formArea.status
          });
          alert("Área atualizada com sucesso!");
          setAreaParaEditar(null);
          fetchAreasPorData(value); 
      } catch (error: any) {
          console.error(error);
          const msgErro = error.response?.data?.erro || error.response?.data?.message || "Erro desconhecido ao atualizar.";
          alert(`Não foi possível atualizar: ${msgErro}`);
      }
  };

  const getCasa = (cliente: Cliente) => {
    if (cliente.residencias && cliente.residencias.length > 0) {
      return cliente.residencias[0].numeroCasa;
    }
    return "S/N";
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('pt-BR');
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

      {areaParaEditar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
                <div className="bg-[#5e5ced] p-4 flex justify-between items-center">
                    <h2 className="text-white font-bold text-lg">Editar Área Comum</h2>
                    <button onClick={() => setAreaParaEditar(null)} className="text-white hover:bg-white/20 rounded-full p-1">
                        <span className="text-xl font-bold">✕</span>
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Área</label>
                        <input 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none"
                            value={formArea.nome}
                            onChange={e => setFormArea({...formArea, nome: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Taxa (R$)</label>
                            <input 
                                type="text"
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none"
                                value={formArea.preco}
                                onChange={e => setFormArea({...formArea, preco: e.target.value})}
                                placeholder="0.00"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                            <input 
                                type="number" 
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none"
                                value={formArea.capacidade}
                                onChange={e => setFormArea({...formArea, capacidade: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status de Disponibilidade</label>
                        <select 
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none"
                            value={formArea.status}
                            onChange={e => setFormArea({...formArea, status: e.target.value})}
                        >
                            <option value="ATIVO">Ativo (Disponível para Reserva)</option>
                            <option value="MANUTENCAO">Em Manutenção (Bloqueado)</option>
                            <option value="OCUPADO">Ocupado / Bloqueado Manualmente</option>
                            <option value="INATIVO">Inativo (Oculto no app)</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            * "Manutenção" e "Ocupado" impedem novas reservas no App.
                        </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button onClick={() => setAreaParaEditar(null)} className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
                        <button onClick={salvarArea} className="flex-1 py-2 bg-[#5e5ced] text-white rounded-lg hover:bg-[#4a48c9] font-medium">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
      )}

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Complaint.png" alt="" className="w-8 h-8" /><span className="text-lg">Cadastro de Morador</span>
              </button>
              <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                <img src="../Account Male.png" alt="" className="w-8 h-8" /><span className="text-lg">Sistemas de Reserva</span>
              </button>
              <a href="/manutencao">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Wrench.png" alt="" className="w-8 h-8" /><span className="text-lg">Manutenção/Sugestão</span>
                </button>
              </a>
            </div>
            <div className="flex justify-center gap-4 md:gap-10">
                <button onClick={() => setIsComunicacaoModalOpen(true)} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full md:w-1/3 h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Plus.png" alt="" className="w-8 h-8" /><span className="text-lg">Novo Comunicado</span>
                </button>
                <button onClick={() => setIsVotacaoModalOpen(true)} className="flex items-center justify-center gap-3 bg-white rounded-[10px] w-full md:w-1/3 h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../PollAzul.png" alt="" className="w-8 h-8" /><span className="text-lg">Nova Votação</span>
                </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start px-4 md:px-6 mt-6 pb-6">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 w-full max-w-[1600px]">
            <div className="flex-1 w-full bg-white rounded-2xl p-4 md:p-10 shadow-2xl flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Votações em andamento</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {votacoes.slice(0, 4).map((votacao) => {
                   const op1 = votacao.opcoes[0];
                   const op2 = votacao.opcoes[1];
                   return (
                    <div key={votacao.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 rounded-xl shadow-md flex flex-col h-full">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{votacao.titulo}</h2>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{votacao.descricao}</p>
                      <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                        {op1 && (
                          <div className="flex items-center gap-2">
                            <img src="../Done.png" className="w-5 h-5" />
                            <span className="text-sm font-bold text-green-700">{op1._count.votos} - {op1.texto}</span>
                          </div>
                        )}
                        {op2 && (
                          <div className="flex items-center gap-2">
                            <img src="../Multiply.png" className="w-5 h-5" />
                            <span className="text-sm font-bold text-red-600">{op2._count.votos} - {op2.texto}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center text-gray-400 mt-2">Total: {votacao._count.votos} votos</p>
                    </div>
                   );
                })}
                {votacoes.length === 0 && <p className="text-gray-500">Nenhuma votação ativa.</p>}
              </div>
            </div>

            <div className="w-full lg:w-[400px] bg-white rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col">
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

        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                Gestão de Áreas Comuns 
                <span className="text-sm font-normal text-gray-500 ml-2">
                    (Visualizando: {value.toLocaleDateString('pt-BR')})
                </span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6">
              <div className="bg-gray-50 rounded-xl shadow-md p-4 w-full md:w-[400px] flex justify-center">
                <Calendar onChange={setValue} value={value} className="border-none rounded-xl shadow-sm w-full" />
              </div>

              <div className="flex-1 w-full flex flex-col gap-4">
                {isLoadingAreas && <p className="text-center py-4 text-blue-600">Buscando disponibilidade para esta data...</p>}
                
                {!isLoadingAreas && areas.map((area) => {
                  const isManutencao = area.statusHoje === 'Manutenção';
                  const isOcupado = area.statusHoje === 'Ocupado (Fixo)' || area.statusHoje === 'Ocupado';
                  
                  let borderColor = '#22c55e'; 
                  let statusColor = 'text-green-600';
                  let iconBg = 'bg-green-500';

                  if (isManutencao) {
                      borderColor = '#f97316'; 
                      statusColor = 'text-orange-600';
                      iconBg = 'bg-orange-500';
                  } else if (isOcupado) {
                      borderColor = '#ef4444'; 
                      statusColor = 'text-red-600';
                      iconBg = 'bg-red-500';
                  } else if (area.statusHoje === 'Inativo') {
                      borderColor = '#9ca3af';
                      statusColor = 'text-gray-500';
                      iconBg = 'bg-gray-400';
                  }

                  return (
                    <div key={area.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-xl p-4 shadow-md border-l-4 transition-all hover:shadow-lg"
                         style={{ borderLeftColor: borderColor }}>
                      <div className="flex items-center gap-4 mb-4 sm:mb-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl ${iconBg}`}>
                          {isManutencao ? '🛠️' : '🏠'}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{area.nome}</h3>
                          <p className="text-sm text-gray-600">Capacidade: {area.capacidade} pessoas</p>
                          <p className={`text-sm font-bold ${statusColor}`}>
                            {area.statusHoje}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Taxa de uso</p>
                            <span className="text-gray-800 font-bold text-lg">R$ {area.preco}</span>
                          </div>
                          
                          <button 
                             onClick={() => abrirModalArea(area)}
                             className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition text-sm font-medium shadow-sm"
                          >
                             Editar / Manutenção
                          </button>
                      </div>
                    </div>
                  );
                })}
                
                {areas.length === 0 && !isLoadingAreas && (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        Nenhuma área comum cadastrada no sistema.
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 md:p-8">
          <div className="w-full max-w-[2300px] bg-white rounded-2xl shadow-2xl p-4 md:p-10">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Cadastros Pendentes de Aprovação</h1>
            
            {!isLoading && pendentes.length === 0 && (
              <div className="p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                Nenhum cadastro pendente no momento.
              </div>
            )}

            <div className='space-y-4 mt-4'>
              {pendentes.map((cadastro) => (
                <div key={cadastro.id} className='bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4'>
                  <div>
                    <div className='flex items-center space-x-2'>
                      <h1 className='text-lg font-semibold text-gray-800'>{cadastro.nome}</h1>
                      <div className='px-2 h-5 bg-amber-300 rounded-[5px] flex items-center justify-center'>
                        <span className='text-yellow-800 text-xs font-bold'>Pendente</span>
                      </div>
                    </div>
                    <h1 className='text-sm font-medium text-gray-700 mt-1'>
                      CPF: {cadastro.cpf} • Casa Nº <strong>{getCasa(cadastro)}</strong>
                    </h1>
                    <h1 className='opacity-70 text-black text-xs font-medium mt-0.5'>
                      Solicitado em {formatDate(cadastro.createdAt)}
                    </h1>
                  </div>
                  <div className='flex items-center gap-3'>
                    <button 
                      onClick={() => setDetalhesClienteId(cadastro.id)}
                      className='flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition shadow-sm'
                    >
                      <img src="../View.png" alt="" className='w-4 h-4 mr-2' />Visualizar
                    </button>
                    <button onClick={() => handleAprovar(cadastro.id)} className='flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition shadow-md'>
                      <img src="../DoneBranco.png" alt="" className='w-4 h-4 mr-2' />Aprovar
                    </button>
                    <button onClick={() => handleRejeitar(cadastro.id)} className='flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition shadow-md'>
                      <img src="../MultiplyBranco.png" alt="" className='w-4 h-4 mr-2' />Rejeitar
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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Administracao;