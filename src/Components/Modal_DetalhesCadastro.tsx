import { useEffect, useState } from 'react';
import api from '../services/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  clienteId: string | null;
  onAprovar: (id: string) => void;
  onRejeitar: (id: string) => void;
}

interface DetalhesCliente {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  profissao: string;
  estadoCivil: string;
  dataNasc: string;
  createdAt: string;
  contatos: { telefone: string; whatsapp: string }[];
  residencias: { numeroCasa: string; rua: string; Tipo: string; proprietario: string }[];
  moradores: { nome: string; parentesco: string; cpf: string }[];
  veiculos: { modelo: string; placa: string; cor: string; TipoVeiculo: string }[];
  documentos: { id: number; nomeArquivo: string; url: string; tipo: string }[];
}

export default function ModalDetalhesCadastro({ isOpen, onClose, clienteId, onAprovar, onRejeitar }: ModalProps) {
  const [data, setData] = useState<DetalhesCliente | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && clienteId) {
      setLoading(true);
      api.get(`/clientes/${clienteId}`)
        .then(res => setData(res.data))
        .catch(err => console.error("Erro ao carregar detalhes:", err))
        .finally(() => setLoading(false));
    } else {
      setData(null);
    }
  }, [isOpen, clienteId]);

  if (!isOpen) return null;

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('pt-BR');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">     
        <div className="bg-white rounded-xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Análise de Cadastro</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Carregando dados completos...</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-blue-700 mb-4 border-b pb-2">Dados Pessoais & Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-semibold text-gray-500 block">Nome</span> {data.nome}</div>
                  <div><span className="font-semibold text-gray-500 block">CPF</span> {data.cpf}</div>
                  <div><span className="font-semibold text-gray-500 block">RG</span> {data.rg}</div>
                  <div><span className="font-semibold text-gray-500 block">Data Nasc.</span> {formatDate(data.dataNasc)}</div>
                  <div><span className="font-semibold text-gray-500 block">Estado Civil</span> {data.estadoCivil}</div>
                  <div><span className="font-semibold text-gray-500 block">Profissão</span> {data.profissao}</div>
                  <div><span className="font-semibold text-gray-500 block">Email</span> {data.email}</div>
                  {data.contatos[0] && (
                    <>
                      <div><span className="font-semibold text-gray-500 block">Telefone</span> {data.contatos[0].telefone}</div>
                      <div><span className="font-semibold text-gray-500 block">WhatsApp</span> {data.contatos[0].whatsapp}</div>
                    </>
                  )}
                </div>
              </section>
              <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-purple-700 mb-4 border-b pb-2">Residência</h3>
                {data.residencias.map((res, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-500 block">Unidade/Casa</span> {res.numeroCasa}</div>
                    <div><span className="font-semibold text-gray-500 block">Setor/Rua</span> {res.rua}</div>
                    <div><span className="font-semibold text-gray-500 block">Tipo</span> {res.Tipo}</div>
                    <div><span className="font-semibold text-gray-500 block">Proprietário da Unidade</span> {res.proprietario}</div>
                  </div>
                ))}
              </section>
              <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-orange-600 mb-4 border-b pb-2">Documentos Anexados</h3>
                
                {data.documentos.length === 0 ? (
                   <p className="text-gray-500 italic">Nenhum documento anexado.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.documentos.map((doc) => (
                      <div key={doc.id} className="flex flex-col bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                        <div className="p-3 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                          <span className="font-bold text-gray-700 text-sm uppercase">{doc.tipo.replace('_', ' ')}</span>
                          <a 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Ver Original ↗
                          </a>
                        </div>
                        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
                          {doc.nomeArquivo.toLowerCase().endsWith('.pdf') ? (
                            <div className="text-center p-4">
                              <p className="text-gray-500 mb-2">Este documento é um PDF</p>
                              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white text-sm rounded shadow hover:bg-blue-700 transition">
                                Abrir PDF
                              </a>
                            </div>
                          ) : (
                            <img 
                              src={doc.url} 
                              alt={doc.tipo} 
                              className="w-full h-full object-contain" 
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Veículos ({data.veiculos.length})</h3>
                  {data.veiculos.length === 0 && <p className="text-gray-500 text-sm italic">Nenhum veículo.</p>}
                  <ul className="space-y-3">
                    {data.veiculos.map((v, i) => (
                      <li key={i} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-bold">{v.placa}</span> - {v.modelo} ({v.cor})
                        <span className="block text-xs text-gray-500">{v.TipoVeiculo}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Familiares ({data.moradores.length})</h3>
                  {data.moradores.length === 0 && <p className="text-gray-500 text-sm italic">Nenhum familiar.</p>}
                  <ul className="space-y-3">
                    {data.moradores.map((m, i) => (
                      <li key={i} className="text-sm bg-gray-50 p-2 rounded">
                        <span className="font-bold">{m.nome}</span>
                        <span className="block text-xs text-gray-500">{m.parentesco} • CPF: {m.cpf}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

            </div>
          ) : (
            <p className="text-red-500 text-center">Erro ao carregar dados.</p>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end gap-4 bg-gray-50 rounded-b-xl">
          <button 
            onClick={onClose} 
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition"
          >
            Cancelar
          </button>
          
          {data && (
            <>
               <button 
                onClick={() => onRejeitar(data.id)} 
                className="px-6 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg hover:bg-red-200 font-medium transition"
              >
                Rejeitar Cadastro
              </button>
              <button 
                onClick={() => onAprovar(data.id)} 
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-md transition"
              >
                Aprovar Cadastro
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}