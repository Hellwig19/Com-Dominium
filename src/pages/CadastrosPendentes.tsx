import { useEffect, useState } from 'react';
import Footer from '../Components/footer';
import Header from '../Components/Header';
import ModalDetalhesCadastro from '../Components/Modal_DetalhesCadastro';
import api from '../services/api';

interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  residencias: { numeroCasa: string }[];
  createdAt: string;
}

const CadastrosPendentes = () => {
  const [pendentes, setPendentes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detalhesClienteId, setDetalhesClienteId] = useState<string | null>(null);

  const fetchPendentes = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/clientes?pendentes=true');
      setPendentes(res.data || []);
    } catch (err) {
      console.error('Erro ao carregar cadastros pendentes', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendentes();
  }, []);

  const getCasa = (cliente: Cliente) => {
    if (cliente.residencias && cliente.residencias.length > 0) {
      return cliente.residencias[0].numeroCasa;
    }
    return 'S/N';
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR');

  const handleAprovar = async (id: string) => {
    if (!confirm('Tem certeza que deseja aprovar este cadastro?')) return;
    try {
      await api.patch(`/clientes/${id}/aprovar`);
      alert('Cliente aprovado com sucesso!');
      fetchPendentes();
    } catch (err) {
      alert('Erro ao aprovar cliente.');
    }
  };

  const handleRejeitar = async (id: string) => {
    if (!confirm('Tem certeza que deseja REJEITAR e EXCLUIR este cadastro?')) return;
    try {
      await api.delete(`/clientes/${id}/rejeitar`);
      alert('Cliente rejeitado.');
      fetchPendentes();
    } catch (err) {
      alert('Erro ao rejeitar cliente.');
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>

      <ModalDetalhesCadastro
        isOpen={!!detalhesClienteId}
        onClose={() => setDetalhesClienteId(null)}
        clienteId={detalhesClienteId}
        onAprovar={async (id: string) => { await handleAprovar(id); setDetalhesClienteId(null); }}
        onRejeitar={async (id: string) => { await handleRejeitar(id); setDetalhesClienteId(null); }}
      />

      <main className="bg-[#EAEAEA] min-h-screen">
        <div className="flex justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-[1200px] bg-white rounded-2xl shadow-2xl p-6 md:p-10">
            <h1 className="text-2xl font-bold mb-4">Cadastros Pendentes de Aprovação</h1>

            {!isLoading && pendentes.length === 0 && (
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
                    <h1 className="text-sm font-medium text-gray-700 mt-1">CPF: {cadastro.cpf} • Casa Nº <strong>{getCasa(cadastro)}</strong></h1>
                    <h1 className="opacity-70 text-black text-xs font-medium mt-0.5">Solicitado em {formatDate(cadastro.createdAt)}</h1>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setDetalhesClienteId(cadastro.id)} className="flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium text-sm hover:bg-blue-50 transition shadow-sm">
                      <img src="../View.png" alt="" className="w-4 h-4 mr-2" />Visualizar
                    </button>
                    <button onClick={() => handleAprovar(cadastro.id)} className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg font-medium text-sm hover:bg-green-700 transition shadow-md">
                      <img src="../DoneBranco.png" alt="" className="w-4 h-4 mr-2" />Aprovar
                    </button>
                    <button onClick={() => handleRejeitar(cadastro.id)} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium text-sm hover:bg-red-700 transition shadow-md">
                      <img src="../MultiplyBranco.png" alt="" className="w-4 h-4 mr-2" />Rejeitar
                    </button>
                  </div>
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

export default CadastrosPendentes;
