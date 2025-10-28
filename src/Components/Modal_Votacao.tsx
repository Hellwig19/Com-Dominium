import React from 'react';
import { X } from 'lucide-react'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalVot: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full m-4 max-h-full flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()} role="document">    
                <div className="flex items-center justify-between p-8 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src="./PollAzul.png" alt="Ícone Nova Votação" className="w-10 h-10 text-blue-600" />
                        <div>
                            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">Nova Votação</h2>
                            <h1 className='text-gray-600 font-bold'>Criar uma nova votação para o condomínio</h1>
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
                            <input type="text" id="titulo" placeholder="Ex: Aprovação da nova área de lazer" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150" required/>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <div className="flex-1">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                                    Categoria <span className="text-red-500">*</span>
                                </label>
                                <select id="categoria" className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 appearance-none transition duration-150" required >
                                    <option value="" disabled selected>Selecione uma categoria</option>
                                    <option value="financeiro">Financeiro</option>
                                    <option value="obras">Obras/Reforma</option>
                                    <option value="regulamento">Regulamento</option>
                                    <option value="outros">Outros</option>
                                </select>
                            </div>

                            <div className="sm:w-1/3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Prioridade
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="radio" name="prioridade" value="baixa" className="form-radio text-blue-600 h-4 w-4" />
                                        <span className="ml-2">Baixa</span>
                                    </label>
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="radio" name="prioridade" value="media" className="form-radio text-blue-600 h-4 w-4" defaultChecked />
                                        <span className="ml-2">Média</span>
                                    </label>
                                    <label className="flex items-center text-sm text-gray-700">
                                        <input type="radio" name="prioridade" value="alta" className="form-radio text-blue-600 h-4 w-4" />
                                        <span className="ml-2">Alta</span>
                                    </label>
                                </div>
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
                            <textarea id="descricao" rows={4} placeholder="Descreva a proposta que será votada..." className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 resize-none" required/>
                        </div>
                    </section>
                </div>

                <div className="flex justify-end space-x-3 p-4 border-t border-gray-100 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
                        Cancelar
                    </button>
                    <button type="submit" className="flex items-center space-x-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md shadow-blue-500/50">
                        <img src="./Send.png" alt="Ícone Publicar" className="h-5 w-5 transform" />
                        <span>Publicar votação</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalVot;