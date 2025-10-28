import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalComu: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full m-4 max-h-full flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()} role="document">
                <div className="flex items-center justify-between p-8 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src="./MegaphoneAzul.png" alt="Ícone Central de Comunicação" className="w-10 h-10 text-green-600" />
                        <div>
                            <h2 id="modal-title" className="text-xl font-semibold text-gray-800">Central de Comunicação</h2>
                            <h1 className='text-gray-600 font-bold'>Envie comunicados e mantenha os moradores informados</h1>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition" aria-label="Fechar">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    <h3 className="text-lg font-semibold text-gray-700">Enviar aviso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="destinatarios" className="block text-sm font-medium text-gray-700">Destinatários</label>
                            <div className="relative mt-1">
                                <select id="destinatarios" name="destinatarios" defaultValue="Todos os moradores" className="block w-full appearance-none border border-gray-300 bg-white rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <option>Todos os moradores</option>
                                    <option>Grupo A</option>
                                    <option>Apartamento X</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de comunicado</label>
                            <div className="relative mt-1">
                                <select id="tipo" name="tipo" defaultValue="Evento" className="block w-full appearance-none border border-gray-300 bg-white rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                                    <option>Evento</option>
                                    <option>Manutenção</option>
                                    <option>Aviso Geral</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700">Assunto:</label>
                        <div className="mt-1">
                            <input type="text" id="assunto" name="assunto" placeholder="Digite o assunto do comunicado" className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"/>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center space-x-2 text-blue-600 font-2x1 font-bold pb-2">
                            <img src="./Info Squared.png" alt="Ícone Informações" className="w-8 h-8" />
                                <h3>Informações Básicas</h3>
                            <div className="w-4 h-4 flex items-center justify-center text-blue-500">
                            </div>
                        </div>
                        <div className="mt-1">
                            <textarea id="mensagem" name="mensagem" rows={5} placeholder="Digite sua mensagem aqui..." className="block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none">
                            </textarea>
                        </div>
                    </div>

                    <div className="flex space-x-8 pt-4">
                        <div className="flex items-center">
                            <input id="email-1" name="email-1" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="email-1" className="ml-2 block text-sm text-gray-900">
                                Enviar por email
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input id="email-2" name="email-2" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="email-2" className="ml-2 block text-sm text-gray-900">
                                Enviar por email
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input id="email-3" name="email-3" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <label htmlFor="email-3" className="ml-2 block text-sm text-gray-900">
                                Enviar por email
                            </label>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end space-x-3 p-4 border-t border-gray-100 flex-shrink-0">
                    <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
                        Cancelar
                    </button>
                    <button type="submit" className="flex items-center space-x-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md shadow-blue-500/50">
                        <img src="./Send.png" alt="Ícone Publicar" className="h-5 w-5 transform" />
                        <span>Publicar Comunicado</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalComu;