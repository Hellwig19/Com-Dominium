import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import api from '../services/api';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalComu: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('NORMAL'); 
    const [destinatario, setDestinatario] = useState('Todos os moradores');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!titulo.trim() || !descricao.trim()) {
            alert("Preencha o título e a mensagem.");
            return;
        }

        setLoading(true);
        try {
            await api.post('/avisos', {
                titulo,
                descricao,
                tipo
            });

            alert('Comunicado enviado com sucesso!');
            setTitulo('');
            setDescricao('');
            setTipo('NORMAL');
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erro ao enviar comunicado. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full m-4 max-h-[90vh] flex flex-col animate-fade-in overflow-hidden">
                
                <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <img src="./Megaphone.png" alt="Ícone" className="w-8 h-8 brightness-0 invert" />
                        <div>
                            <h2 className="text-2xl font-bold">Novo Comunicado</h2>
                            <p className="text-white/80 text-sm">Envie avisos importantes para os moradores</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="destinatarios" className="block text-sm font-bold text-gray-700 mb-1">Destinatários</label>
                                <select 
                                    id="destinatarios" 
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none bg-white"
                                    value={destinatario}
                                    onChange={e => setDestinatario(e.target.value)}
                                >
                                    <option>Todos os moradores</option>
                                    <option>Bloco A</option>
                                    <option>Bloco B</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="tipo" className="block text-sm font-bold text-gray-700 mb-1">Prioridade</label>
                                <select 
                                    id="tipo" 
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none bg-white"
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}
                                >
                                    <option value="NORMAL">Normal (Informativo)</option>
                                    <option value="URGENTE">Urgente (Alerta)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="titulo" className="block text-sm font-bold text-gray-700 mb-1">Assunto</label>
                            <input 
                                type="text" 
                                id="titulo" 
                                placeholder="Ex: Manutenção da Piscina" 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2 text-blue-600">
                                <img src="./Info Squared.png" alt="Info" className="w-5 h-5" />
                                <h3 className="font-bold text-sm uppercase tracking-wide">Mensagem</h3>
                            </div>
                            <textarea 
                                id="mensagem" 
                                rows={6} 
                                placeholder="Digite o conteúdo do comunicado aqui..." 
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#5e5ced] focus:border-[#5e5ced] outline-none resize-none"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-2">
                            <button type="button" onClick={onClose} className="px-6 py-3 text-gray-700 font-medium bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="px-8 py-3 text-white font-bold bg-[#5e5ced] hover:bg-[#4a48c9] rounded-lg shadow-md transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Enviando...' : (
                                    <>
                                        <Send className="w-4 h-4" /> Publicar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalComu;