import { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import DataAtual from '../Components/Data';
import api from '../services/api';

interface Sugestao {
  id: number;
  titulo: string;
  descricao: string;
  data: string;
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
  const [avisosUrgentes, setAvisosUrgentes] = useState<Aviso[]>([]);
  const [totalMoradores, setTotalMoradores] = useState(0);
  
  const [adminName, setAdminName] = useState('Colaborador');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // 1. Identificação do Usuário
      const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
      if (nomeSalvo) setAdminName(nomeSalvo.split(' ')[0]);

      // 2. Buscar Dados (Separado para não quebrar tudo se um falhar)
      try {
        // -- Sugestões --
        try {
            const resSug = await api.get('/sugestoes');
            console.log("Sugestões recebidas:", resSug.data);
            setSugestoes(resSug.data);
        } catch (e) {
            console.error("Erro ao buscar sugestões (verifique permissão):", e);
        }

        // -- Avisos --
        try {
            const resAvisos = await api.get('/avisos');
            console.log("Avisos recebidos:", resAvisos.data);
            const urgentes = resAvisos.data.filter((a: Aviso) => a.tipo === 'URGENTE');
            setAvisosUrgentes(urgentes);
        } catch (e) {
            console.error("Erro ao buscar avisos:", e);
        }

        // -- Clientes --
        try {
            const resClientes = await api.get('/clientes');
            console.log("Clientes recebidos:", resClientes.data);
            setTotalMoradores(resClientes.data.length);
        } catch (e) {
            console.error("Erro ao buscar clientes:", e);
        }

      } catch (error) {
        console.error("Erro geral na manutenção:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Helpers ---
  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  const getSaudacao = () => {
    const hora = new Date().getHours();
    // Das 06:00 às 11:59 -> Bom dia
    if (hora >= 6 && hora < 12) return 'Bom dia';
    // Das 12:00 às 18:59 -> Boa tarde
    if (hora >= 12 && hora < 19) return 'Boa tarde';
    // Resto (19:00 às 05:59) -> Boa noite
    return 'Boa noite';
  };

  const timeAgo = (isoString: string) => {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays > 0) return `Há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
      if (diffHrs > 0) return `Há ${diffHrs} hora${diffHrs > 1 ? 's' : ''}`;
      return "Agora mesmo";
  };

  const getCasa = (sugestao: Sugestao) => {
    if (sugestao.cliente?.residencias && sugestao.cliente.residencias.length > 0) {
      return `Casa ${sugestao.cliente.residencias[0].numeroCasa}`;
    }
    return "Unidade S/N";
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA] min-h-screen'>
        <div className='bg-white flex justify-center items-center py-4 space-x-6 shadow-md'>
          <a href="/admin">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
              <img className="mr-2 h-5 w-5" src="./Home.png" alt="" />
              Inicio
            </button>
          </a>
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
            <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="" />
            Comunicação
          </button>
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
            <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="" />
            Votação
          </button>
        </div>

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
        
        <div className='mx-auto w-[90%] max-w-[2300px] mt-8'>
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
              
              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Sugestões Pendentes</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>{sugestoes.length}</h1>
                  <div className='bg-blue-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Light.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Up Arrow.png" alt="" />
                  <h1 className="text-sm text-green-600 font-medium">Aguardando análise</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Manutenção Ativa</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>{avisosUrgentes.length}</h1>
                  <div className='bg-orange-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Tools.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Clock.png" alt="" />
                  <h1 className="text-sm text-orange-600 font-medium">Alertas Urgentes</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Manutenção Concluída</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>0</h1>
                  <div className='bg-green-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./Check Mark.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./DoneVerdeEscuro.png" alt="" />
                  <h1 className="text-sm text-green-600 font-medium">Meta Atingida</h1>
                </div>
              </div>

              <div className='border rounded-xl p-5 text-left bg-white shadow-md hover:shadow-lg transition-shadow'>
                <h1 className='text-gray-600 text-lg md:text-xl font-medium mb-2'>Moradores Ativos</h1>
                <div className='flex justify-between text-2xl md:text-3xl items-center'>
                  <h1 className='font-bold'>{totalMoradores}</h1>
                  <div className='bg-purple-100 flex items-center rounded-xl p-2'>
                    <img className='w-8 h-8 md:w-9 md:h-9' src="./BuildingRoxo.png" alt="" />
                  </div>
                </div>
                <div className='flex flex-row items-center gap-2 mt-2'>
                  <img className="h-4 w-4" src="./Users.png" alt="" />
                  <h1 className="text-sm text-purple-600 font-medium">Cadastrados</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start px-4 md:px-6 mt-8 pb-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-8 w-full max-w-[2300px]">

            <div className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xl flex flex-col">
              <div className='flex justify-between items-center mb-6 border-b pb-4 border-gray-200'>
                <div className='flex items-center gap-2'>
                  <img className="h-7 w-7" src="./Chat.png" alt="Ícone de chat" />
                  <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                    Últimas Solicitações
                  </h1>
                </div>
                <div className='flex items-center gap-1'>
                  <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Ver Todas</a>
                  <img className='h-4 w-4' src="./Right.png" alt="Seta" />
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                {isLoading && <p className="text-gray-500 text-center">Carregando...</p>}
                {!isLoading && sugestoes.length === 0 && (
                    <div className="p-4 bg-gray-50 rounded text-center text-gray-500">Nenhuma solicitação ou sugestão encontrada.</div>
                )}

                {sugestoes.slice(0, 3).map((sug) => (
                  <div key={sug.id} className="flex w-full p-4 md:p-5 bg-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-blue-700 font-bold">
                        {sug.cliente?.nome?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-gray-800 text-sm md:text-base">
                            {sug.cliente?.nome || 'Anônimo'} - {getCasa(sug)}
                        </span>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-4">{timeAgo(sug.data)}</span>
                      </div>
                      <p className="text-sm text-gray-900 font-medium mb-1">{sug.titulo}</p>
                      <p className="text-sm text-gray-700 mb-3">{sug.descricao}</p>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <img className="h-3 w-3 mr-1" src="./Shield.png" alt="Tag" />
                          Geral
                        </span>
                        <div className="flex space-x-4 text-sm font-medium">
                          <button className="flex items-center text-green-600 hover:text-green-700">
                            <img className="h-4 w-4 mr-1" src="./DoneVerdeEscuro.png" alt="Aprovar" />
                            Concluir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[450px] bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col">
              <div className='flex items-center gap-2 mb-6 border-b pb-4 border-gray-200'>
                <img className='h-7 w-7' src="./Error.png" alt="" />
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                  Alertas Prioritários
                </h1>
              </div>

              <div className="flex flex-col gap-4 text-sm">
                {isLoading && <p className="text-gray-500 text-center">Carregando...</p>}
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
                    <div className='bg-red-600 rounded-full px-4 py-1 text-white flex-shrink-0'>
                      <h1 className="text-xs font-semibold uppercase">Urgente</h1>
                    </div>
                  </div>
                ))}
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