import React, { useState } from 'react';
import { X } from 'lucide-react'; 
import api from '../services/api';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCad: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [form, setForm] = useState({ 
        nome: '', 
        cpf: '', 
        placa: '', 
        numeroCasa: '', 
        observacoes: '' 
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // CORREÇÃO AQUI: Mudou de '/visitas/entrada' para '/visitantes'
            await api.post('/visitantes', {
                nome: form.nome,
                cpf: form.cpf,
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-gray-100 flex justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Registrar Entrada de Visitante</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <input 
                                    type="text" required
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Digite o nome"
                                    value={form.nome}
                                    onChange={e => setForm({...form, nome: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
                                <input 
                                    type="text" required
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="000.000.000-00"
                                    value={form.cpf}
                                    onChange={e => setForm({...form, cpf: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* CAMPO NÚMERO DA CASA (TEXTO) */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Número da Casa</label>
                                <input 
                                    type="text" required
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex: 101"
                                    value={form.numeroCasa}
                                    onChange={e => setForm({...form, numeroCasa: e.target.value})}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Placa do Veículo (Opcional)</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-300 rounded-lg p-2.5 uppercase focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="ABC-1234"
                                    maxLength={8}
                                    value={form.placa}
                                    onChange={e => setForm({...form, placa: e.target.value.toUpperCase()})}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                            <textarea 
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Ex: Entrega de iFood, Prestador de serviço..."
                                value={form.observacoes}
                                onChange={e => setForm({...form, observacoes: e.target.value})}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={onClose} className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 shadow-md"
                            >
                                {loading ? 'Registrando...' : 'Confirmar Entrada'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalCad;