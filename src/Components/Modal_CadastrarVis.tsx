import React from 'react';
import { X } from 'lucide-react'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCad: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()} role="document">
                
                <div className="relative p-6 sm:p-8 flex items-start justify-between border-b border-gray-100 flex-shrink-0">
                    
                    <div className="flex items-center space-x-3">
                        <img src="./UserPlusIcon.png" alt="Ícone de Cadastro" className="w-8 h-8 text-blue-600" />
                        <div>
                            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">Cadastro de Visitante</h2>
                            <p className='text-sm text-gray-600 font-normal mt-1'>Preencha os dados do visitante para liberação de acesso</p>
                        </div>
                    </div>
                    
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition" aria-label="Fechar">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 sm:p-8 flex-grow overflow-y-auto space-y-8">
                    <form className="space-y-8">
                        
                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-gray-800 flex items-center">
                                <img src="./CreditCardIcon.png" alt="Ícone Pessoais" className="w-5 h-5 mr-2 text-blue-600" />
                                Informações Pessoais
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input type="text" id="nome" className="block w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" placeholder="Digite o nome completo" />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <img src="./PersonIcon.png" alt="Ícone Pessoa" className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">CPF <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            id="cpf" 
                                            className="block w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" 
                                            placeholder="000.000.000-00" 
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <img src="./DocumentIcon.png" alt="Ícone Documento" className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-gray-800 flex items-center">
                                <img src="./MapPinIcon.png" alt="Ícone Visita" className="w-5 h-5 mr-2 text-blue-600" />
                                Informações da Visita
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="casa" className="block text-sm font-medium text-gray-700 mb-1">Número da Casa <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select id="casa" className="appearance-none block w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 focus:ring-blue-500 focus:border-blue-500 bg-white">
                                            <option>Selecione a casa</option>
                                            <option>Casa 101</option>
                                            <option>Casa 102</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="placa" className="block text-sm font-medium text-gray-700 mb-1">Placa do Veículo <span className="text-gray-500">(Opcional)</span></label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            id="placa" 
                                            className="block w-full border border-gray-300 rounded-lg shadow-sm pl-3 pr-10 py-2.5 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400" 
                                            placeholder="ABC-1234" 
                                        />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <img src="./CarIcon.png" alt="Ícone Carro" className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h3 className="text-base font-semibold text-gray-800 flex items-center">
                                <img src="./InfoCircleIcon.png" alt="Ícone Info" className="w-5 h-5 mr-2 text-blue-600" />
                                Informações Adicionais
                            </h3>
                            <div>
                                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                                <textarea
                                    id="observacoes"
                                    rows={4}
                                    className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                                    placeholder="Informações adicionais sobre a visita (opcional)"
                                ></textarea>
                            </div>
                        </section>
                    </form>
                </div>

                <div className="p-6 sm:p-8 flex-shrink-0 border-t border-gray-100 flex justify-end space-x-3">
                    <button onClick={onClose} className="px-6 py-2.5 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
                        Cancelar
                    </button>
                    <button type="submit" className="px-6 py-2.5 text-base font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center space-x-2">
                        <span>Cadastrar Visitante</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCad;