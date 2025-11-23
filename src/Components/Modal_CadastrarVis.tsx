import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react'; 
import api from '../services/api';

interface VisitanteDados {
    nome: string;
    cpf: string;
    numeroCasa: string;
    placa?: string | null;
    observacoes?: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    dadosIniciais?: VisitanteDados | null;
}

const maskCpf = (value: string) => {
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2') 
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2') 
    .replace(/(-\d{2})\d+?$/, '$1'); 
};

const ModalCad: React.FC<ModalProps> = ({ isOpen, onClose, dadosIniciais }) => {
    const [form, setForm] = useState({ 
        nome: '', 
        cpf: '', 
        placa: '', 
        numeroCasa: '', 
        observacoes: '' 
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && dadosIniciais) {
            setForm({
                nome: dadosIniciais.nome || '',
                cpf: maskCpf(dadosIniciais.cpf || ''), 
                placa: dadosIniciais.placa || '',
                numeroCasa: dadosIniciais.numeroCasa || '',
                observacoes: dadosIniciais.observacoes || ''
            });
        } else if (isOpen && !dadosIniciais) {
            setForm({ nome: '', cpf: '', placa: '', numeroCasa: '', observacoes: '' });
        }
    }, [isOpen, dadosIniciais]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const url = dadosIniciais ? '/visitantes/entrada-agendada' : '/visitantes';

            const cpfLimpo = form.cpf.replace(/\D/g, '');

            await api.post(url, {
                nome: form.nome,
                cpf: cpfLimpo,
                placa: form.placa, 
                numeroCasa: form.numeroCasa,
                observacoes: form.observacoes
            });
            
            alert("Entrada registrada com sucesso!");
            setForm({ nome: '', cpf: '', placa: '', numeroCasa: '', observacoes: '' });
            onClose();
        } catch (error: any) {
            console.error(error);
            const msg = error.response?.data?.erro || "Erro ao registrar entrada. Verifique os dados.";
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] flex flex-col animate-fade-in overflow-hidden">
                
                <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-2xl font-bold">
                            {dadosIniciais ? 'Confirmar Entrada (Agendada)' : 'Registrar Entrada'}
                        </h2>
                        <p className="text-white/80 text-sm">
                            {dadosIniciais ? 'Confira os dados abaixo antes de liberar.' : 'Preencha os dados do visitante.'}
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto bg-gray-50">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nome Completo</label>
                                <input 
                                    type="text" required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none transition"
                                    placeholder="Digite o nome"
                                    value={form.nome}
                                    onChange={e => setForm({...form, nome: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">CPF</label>
                                <input 
                                    type="text" required
                                    maxLength={14} 
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none transition"
                                    placeholder="000.000.000-00"
                                    value={form.cpf}
                                    onChange={e => setForm({...form, cpf: maskCpf(e.target.value)})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Número da Casa</label>
                                <input 
                                    type="text" required
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none transition"
                                    placeholder="Ex: 101"
                                    value={form.numeroCasa}
                                    onChange={e => setForm({...form, numeroCasa: e.target.value})}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Placa do Veículo (Opcional)</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg p-3 uppercase focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none transition font-mono"
                                    placeholder="ABC-1234"
                                    maxLength={8}
                                    value={form.placa}
                                    onChange={e => setForm({...form, placa: e.target.value.toUpperCase()})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Observações</label>
                            <textarea 
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none transition resize-none"
                                placeholder="Ex: Entrega de iFood, Prestador de serviço..."
                                value={form.observacoes}
                                onChange={e => setForm({...form, observacoes: e.target.value})}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-4">
                            <button type="button" onClick={onClose} className="px-6 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`px-8 py-3 text-white font-bold rounded-lg shadow-md transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-2 ${dadosIniciais ? 'bg-green-600 hover:bg-green-700' : 'bg-[#5e5ced] hover:bg-[#4a48c9]'}`}
                            >
                                {loading ? (
                                    <>Processing...</>
                                ) : (
                                    dadosIniciais ? 'Confirmar Entrada' : 'Registrar Entrada'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalCad;