import { useState, useEffect } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"
import api from '../services/api';

interface Encomenda {
  id: number;
  nome: string; 
  remetente: string; 
  tamanho: string;
  codigo: string;
  status: 'AGUARDANDO_RETIRADA' | 'ENTREGUE';
  dataChegada: string;
  dataRetirada?: string;
  cliente: {
    nome: string;
    residencias: { numeroCasa: string }[];
  };
}

export default function Encomendas() {
  const [listaEncomendas, setListaEncomendas] = useState<Encomenda[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    numeroCasa: '',
    destinatario: '',
    transportadora: '',
    tipo: 'Encomenda',
    tamanho: 'Médio', 
    observacoes: ''
  });

  const [codigoRetirada, setCodigoRetirada] = useState('');
  const [loadingRetirada, setLoadingRetirada] = useState(false);

  const fetchEncomendas = async () => {
    try {
      const response = await api.get('/encomendas');
      setListaEncomendas(response.data);
    } catch (error) {
      console.error("Erro ao carregar encomendas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEncomendas();
  }, []);


  const handleRegistrar = async () => {
    if (!form.numeroCasa || !form.destinatario || !form.transportadora) {
        alert("Preencha os campos obrigatórios (*)");
        return;
    }

    try {
        await api.post('/encomendas', {
            numeroCasa: form.numeroCasa,
            nome: form.destinatario,
            remetente: form.transportadora,
            tamanho: form.tamanho,
            tipo: form.tipo, 
            observacoes: form.observacoes
        });
        alert("Encomenda registrada com sucesso!");
        setForm({ ...form, numeroCasa: '', destinatario: '', transportadora: '', observacoes: '' }); 
        fetchEncomendas(); 
    } catch (error: any) {
        console.error(error);
        const msg = error.response?.data?.erro || "Erro ao registrar encomenda. Verifique o número da casa.";
        alert(msg);
    }
  };

  const handleValidarCodigo = async () => {
      if (!codigoRetirada) return;
      setLoadingRetirada(true);
      try {
          await api.post('/encomendas/retirar-codigo', { codigo: codigoRetirada });
          alert("Encomenda retirada com sucesso!");
          setCodigoRetirada('');
          fetchEncomendas();
      } catch (error: any) {
          alert(error.response?.data?.erro || "Código inválido ou erro no sistema.");
      } finally {
          setLoadingRetirada(false);
      }
  };

  const handleRetirarManual = async (id: number) => {
      if(!confirm("Confirmar entrega desta encomenda ao morador?")) return;
      try {
          await api.patch(`/encomendas/${id}/retirar`);
          fetchEncomendas();
      } catch (error) {
          alert("Erro ao atualizar status.");
      }
  };

  const getCasa = (item: Encomenda) => {
      if (item.cliente?.residencias?.length > 0) return item.cliente.residencias[0].numeroCasa;
      return "S/N";
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA] min-h-screen'>
        <div className='flex justify-center items-center py-4 space-x-6'>
          <a href="/portaria">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
              <img className="mr-2 h-5 w-5" src="./Home.png" alt="" />
              Inicio
            </button>
          </a>
          <button className='px-8 py-3 bg-blue-50 text-blue-700 rounded-xl shadow-md border border-blue-300 font-medium text-sm flex items-center'>
            <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="Ícone Encomendas" />
            Encomendas
          </button>
          <a href="/portaria">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'>
                <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="Ícone Visitantes" />
                Visitantes
            </button>
          </a>
        </div>

        <div className="flex justify-center items-start px-4 md:px-8 mt-6 pb-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[2300px]">
            <div className='flex-1 space-y-8'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>Retirada de encomendas</h2>

                <div className='flex items-end space-x-4'>
                  <div className='flex-grow'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Código de retirada</label>
                    <div className='relative'>
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <img className="h-5 w-5 text-gray-400" src="./Key.png" alt="Ícone Código" />
                      </span>
                      <input
                        type="text"
                        placeholder="Ex: #1234"
                        className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 uppercase'
                        value={codigoRetirada}
                        onChange={e => setCodigoRetirada(e.target.value)}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleValidarCodigo}
                    disabled={loadingRetirada}
                    className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center disabled:opacity-50'
                  >
                    <img className="h-5 w-5 mr-1" src="./DoneCinza.png" alt="Ícone Validar" />
                    {loadingRetirada ? 'Validando...' : 'Validar'}
                  </button>
                </div>
                <p className='text-xs text-gray-500 mt-2 flex items-center'>
                  <img className="h-4 w-4 mr-1" src="./Info.png" alt="Info" />
                  O código de retirada é enviado para o app do morador.
                </p>
              </div>

              <div className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800 flex items-center'>
                    <img className="h-6 w-6 mr-2 text-blue-600" src="./Trolley.png" alt="Carrinho" />
                    Encomendas na Portaria
                  </h2>
                  <div className='flex space-x-3'>
                    <span className="text-sm text-gray-500 self-center">
                        {listaEncomendas.filter(e => e.status === 'AGUARDANDO_RETIRADA').length} pendentes
                    </span>
                  </div>
                </div>

                <div className='overflow-x-auto max-h-[600px] overflow-y-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50 sticky top-0'>
                      <tr>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Casa</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Destinatário</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Remetente</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Chegada</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>Ações</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {loading && <tr><td colSpan={7} className="p-4 text-center">Carregando...</td></tr>}
                      
                      {!loading && listaEncomendas.map((encomenda) => (
                        <tr key={encomenda.id} className="hover:bg-gray-50">
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <span className='bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded'>
                                {getCasa(encomenda)}
                            </span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium'>
                            {encomenda.nome}
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-600'>
                            {encomenda.remetente} <span className="text-xs text-gray-400">({encomenda.tamanho})</span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {new Date(encomenda.dataChegada).toLocaleDateString()} <br/>
                            <span className="text-xs">{new Date(encomenda.dataChegada).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap'>
                            {encomenda.status === 'AGUARDANDO_RETIRADA' ? (
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-orange-600'>
                                    Aguardando
                                </span>
                            ) : (
                                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                    Entregue
                                </span>
                            )}
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            {encomenda.status === 'AGUARDANDO_RETIRADA' && (
                                <button 
                                    onClick={() => handleRetirarManual(encomenda.id)}
                                    className='text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded border border-blue-200 text-xs'
                                >
                                  Entregar
                                </button>
                            )}
                            {encomenda.status === 'ENTREGUE' && (
                                <span className="text-gray-400 text-xs">Concluído</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-96 bg-white p-6 rounded-lg shadow-xl h-fit flex-shrink-0 sticky top-6'>
              <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
                <img className="h-6 w-6 mr-2 text-blue-600" src="./Add.png" alt="Adicionar" />
                Adicionar Encomenda
              </h2>

              <div className='space-y-6'>
                <div>
                  <label htmlFor="numCasa" className='block text-sm font-medium text-gray-700'>Número da Casa <span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    id="numCasa" 
                    placeholder="Ex: 45" 
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    value={form.numeroCasa}
                    onChange={e => setForm({...form, numeroCasa: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="morador" className='block text-sm font-medium text-gray-700'>Destinatário (Nome) <span className='text-red-500'>*</span></label>
                  <input 
                    type="text" 
                    id="morador" 
                    placeholder="Nome na etiqueta" 
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    value={form.destinatario}
                    onChange={e => setForm({...form, destinatario: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="transportadora" className='block text-sm font-medium text-gray-700'>Transportadora / Remetente <span className='text-red-500'>*</span></label>
                  <input 
                    type="text"
                    id="transportadora"
                    placeholder="Ex: Correios, Amazon, Mercado Livre"
                    className='w-full p-2 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    value={form.transportadora}
                    onChange={e => setForm({...form, transportadora: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="tipoEncomenda" className='block text-sm font-medium text-gray-700'>Tipo</label>
                  <select 
                    id="tipoEncomenda" 
                    className='w-full p-2 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500'
                    value={form.tipo}
                    onChange={e => setForm({...form, tipo: e.target.value})}
                  >
                    <option value="Encomenda">Encomenda</option>
                    <option value="Documento">Documento</option>
                    <option value="Delivery">Delivery / Comida</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Tamanho</label>
                  <div className="flex space-x-4">
                    {['Pequeno', 'Médio', 'Grande'].map((tam) => (
                        <div key={tam} className="flex items-center">
                        <input 
                            id={`tamanho-${tam}`} 
                            name="tamanhoEncomenda" 
                            type="radio" 
                            checked={form.tamanho === tam} 
                            onChange={() => setForm({...form, tamanho: tam})} 
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label htmlFor={`tamanho-${tam}`} className="ml-2 block text-sm font-medium text-gray-700">
                            {tam}
                        </label>
                        </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="observacoes" className='block text-sm font-medium text-gray-700'>Observações</label>
                  <textarea 
                    id="observacoes" 
                    placeholder="Cód Rastreio, estado da caixa..." 
                    className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none'
                    value={form.observacoes}
                    onChange={e => setForm({...form, observacoes: e.target.value})}
                  ></textarea>
                </div>

                <button
                  onClick={handleRegistrar}
                  className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg flex items-center justify-center shadow-lg'
                >
                  <img className="h-6 w-6 mr-2" src="./Secure.png" alt="Registrar" />
                  Registrar Encomenda
                </button>
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