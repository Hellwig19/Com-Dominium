import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const ModalVot: React.FC<ModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataInicio, setDataInicio] = useState(new Date().toISOString().slice(0, 16)); 
    const [dataFim, setDataFim] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16));
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handlePublicar = async () => {
        if (!titulo.trim() || !descricao.trim() || !dataInicio || !dataFim) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                titulo,
                descricao,
                dataInicio: new Date(dataInicio).toISOString(),
                dataFim: new Date(dataFim).toISOString(),
                opcoes: ["A favor", "Contra"] 
            };

            await api.post('/votacoes', payload);
            
            alert('Votação criada com sucesso!');
            
            setTitulo('');
            setDescricao('');
            
            if (onSuccess) onSuccess();
            onClose();

        } catch (error: any) {
            console.error("Erro ao criar votação:", error);
            const msg = error.response?.data?.erro || error.response?.data?.erros || "Erro ao criar votação.";
            alert(typeof msg === 'object' ? JSON.stringify(msg) : msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full m-4 max-h-full flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()} role="document">    
                
                <div className="flex items-center justify-between p-8 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src="./PollAzul.png" alt="Ícone Nova Votação" className="w-10 h-10 text-blue-600" />
                        <div>
                            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">Nova Votação</h2>
                            <h1 className='text-gray-600 font-bold'>Criar votação (A favor / Contra)</h1>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition" aria-label="Fechar">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    <section className="space-y-4">
                        <div className="flex items-center space-x-2 text-blue-600 font-2x1 font-bold pb-2">
                            <img src="./Info Squared.png" alt="Ícone Informações" className="w-8 h-8" />
                            <h3>Informações Básicas</h3>
                        </div>

                        <div>
                            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
                                Título da votação <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                id="titulo" 
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Ex: Aprovação da nova área de lazer" 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150" 
                                required
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <div className="flex-1">
                                <label htmlFor="dataInicio" className="block text-sm font-medium text-gray-700 mb-1">
                                    Data de Início <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="dataInicio" 
                                    value={dataInicio}
                                    onChange={(e) => setDataInicio(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    required 
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="dataFim" className="block text-sm font-medium text-gray-700 mb-1">
                                    Data de Término <span className="text-red-500">*</span>
                                </label>
                                <input 
                                    type="datetime-local" 
                                    id="dataFim" 
                                    value={dataFim}
                                    onChange={(e) => setDataFim(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    required 
                                />
                            </div>
                        </div>
                    </section>

                    <section className="p-4 bg-blue-50 border-t-2 border-blue-200 rounded-lg space-y-4">
                        <div className="flex items-center space-x-2 text-blue-800 font-medium">
                            <img src="./Document.png" alt="Ícone Descrição" className="w-5 h-5" />
                            <h3>Descrição Detalhada</h3>
                        </div>

                        <div>
                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
                                Descrição da proposta <span className="text-red-500">*</span>
                            </label>
                            <textarea 
                                id="descricao" 
                                rows={4} 
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva a proposta que será votada..." 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none" 
                                required
                            />
                        </div>
                        
                        <div className="text-sm text-blue-700 mt-2">
                            * Esta votação será criada automaticamente com as opções: <strong>A favor</strong> e <strong>Contra</strong>.
                        </div>
                    </section>
                </div>

                <div className="flex justify-end space-x-3 p-4 border-t border-gray-100 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        onClick={handlePublicar}
                        disabled={isLoading}
                        className={`flex items-center space-x-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md shadow-blue-500/50 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        <img src="./Send.png" alt="Ícone Publicar" className="h-5 w-5 transform" />
                        <span>{isLoading ? 'Publicando...' : 'Publicar votação'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVot;