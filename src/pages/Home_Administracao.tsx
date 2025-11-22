import { useState, useEffect } from 'react';
 
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
    const [busca, setBusca] = useState('');


  const getSaudacao = () => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) return 'Bom dia';
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    return 'Boa noite';
  };

  const fetchInitialData = async () => {
    try {
      const [resVotacoes, resMoradores] = await Promise.all([
        api.get('/votacoes'),
        api.get('/clientes'),
      ]);
      setVotacoes(resVotacoes.data);
      setMoradores(resMoradores.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
    }
  };

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    if (nomeSalvo) {
        setAdminName(nomeSalvo.split(' ')[0]);
    }
    fetchInitialData();
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
              <a href="/cadastros-pendentes">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Complaint.png" alt="" className="w-8 h-8" /><span className="text-lg">Cadastro de Morador</span>
                </button>
              </a>
              <a href="/reservas">
                <button className="flex items-center justify-center gap-3 bg-white rounded-[10px] h-[60px] md:h-[80px] shadow-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition">
                  <img src="../Account Male.png" alt="" className="w-8 h-8" /><span className="text-lg">Sistemas de Reserva</span>
                </button>
              </a>
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

        
        {/* Cadastros pendentes moved to dedicated page: /cadastros-pendentes */}

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