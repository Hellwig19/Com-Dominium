import React, { useState } from 'react';
import { X, Search, LogOut, CheckCircle, Clock } from 'lucide-react';

interface Visitante {
  id: number | string; 
  nome: string;
  cpf: string;
  numeroCasa: string;
  placa?: string | null;
  status: string; 
  dataEntrada?: string;
  dataSaida?: string | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitantes: Visitante[];
  onRegistrarSaida: (id: number | string) => void; 
}

export default function ModalUltimosAcessos({ isOpen, onClose, visitantes, onRegistrarSaida }: ModalProps) {
  const [filtro, setFiltro] = useState<'TODOS' | 'DENTRO' | 'SAIU'>('TODOS');
  const [termo, setTermo] = useState('');

  if (!isOpen) return null;

  const historicoReal = visitantes.filter(v => v.dataEntrada);

  const listaFiltrada = historicoReal.filter((v) => {
    const bateFiltro = filtro === 'TODOS' ? true : v.status === filtro;
    
    const bateBusca = v.nome.toLowerCase().includes(termo.toLowerCase()) || 
                      v.numeroCasa.includes(termo) ||
                      (v.placa && v.placa.toLowerCase().includes(termo.toLowerCase())) ||
                      v.cpf.includes(termo);
                      
    return bateFiltro && bateBusca;
  });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] flex flex-col animate-fade-in">
                <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 rounded-t-xl flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">Últimos Acessos</h2>
                        <p className="text-white/80 text-sm">Histórico e controle de portaria</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4 border-b border-gray-100 bg-gray-50 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="flex bg-white p-1 rounded-lg border border-gray-200 shadow-sm overflow-x-auto max-w-full">
                        <button 
                            onClick={() => setFiltro('TODOS')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${filtro === 'TODOS' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Todos ({historicoReal.length})
                        </button>
                        <button 
                            onClick={() => setFiltro('DENTRO')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${filtro === 'DENTRO' ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Na Unidade ({historicoReal.filter(v => v.status === 'DENTRO').length})
                        </button>
                        <button 
                            onClick={() => setFiltro('SAIU')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition whitespace-nowrap ${filtro === 'SAIU' ? 'bg-gray-200 text-gray-700' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Finalizados
                        </button>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar nome, casa ou placa..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5e5ced] outline-none text-sm"
                            value={termo}
                            onChange={e => setTermo(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100/50">
                    {listaFiltrada.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <Search className="w-12 h-12 mb-2 opacity-20" />
                            <p>Nenhum registro encontrado.</p>
                        </div>
                    )}

                    {listaFiltrada.map((visita) => {
                        const isDentro = visita.status === 'DENTRO';
                        return (
                            <div key={visita.id} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between hover:shadow-md transition gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg shrink-0 ${isDentro ? 'bg-green-500' : 'bg-gray-400'}`}>
                                        {visita.nome.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg">{visita.nome}</h3>
                                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mt-1">
                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                                🏠 Casa {visita.numeroCasa}
                                            </span>
                                            <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
                                                🆔 {visita.cpf}
                                            </span>
                                            {visita.placa && (
                                                <span className="flex items-center gap-1 bg-yellow-50 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200 font-mono font-bold uppercase">
                                                    🚗 {visita.placa}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full md:w-auto">
                                    <div className="text-right md:text-right text-sm">
                                        {visita.dataEntrada && (
                                            <div className="flex items-center justify-end gap-1 text-green-700 font-medium">
                                                <Clock className="w-3 h-3" /> Entrou: {new Date(visita.dataEntrada).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                            </div>
                                        )}
                                        {!isDentro && visita.dataSaida && (
                                            <div className="flex items-center justify-end gap-1 text-gray-500">
                                                <LogOut className="w-3 h-3" /> Saiu: {new Date(visita.dataSaida).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                                            </div>
                                        )}
                                    </div>

                                    {isDentro ? (
                                        <button 
                                            onClick={() => onRegistrarSaida(visita.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-medium transition whitespace-nowrap"
                                        >
                                            <LogOut className="w-4 h-4" /> Registrar Saída
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 border border-gray-200 rounded-lg font-medium opacity-80 whitespace-nowrap cursor-default">
                                            <CheckCircle className="w-4 h-4" /> Finalizado
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="p-4 border-t border-gray-100 bg-white rounded-b-xl text-center text-xs text-gray-400">
                    Mostrando {listaFiltrada.length} registro(s)
                </div>
            </div>
        </div>
    );
}