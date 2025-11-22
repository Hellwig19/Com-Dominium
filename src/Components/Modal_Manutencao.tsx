import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../services/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalManut: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [enviando, setEnviando] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!titulo.trim() || !descricao.trim()) {
      alert('Preencha o título e a descrição.');
      return;
    }
    try {
      setEnviando(true);
      await api.post('/sugestoes', { titulo: titulo.trim(), descricao: descricao.trim() });
      alert('Sugestão enviada com sucesso! Obrigado.');
      setTitulo('');
      setDescricao('');
      onClose();
    } catch (err) {
      console.error('Erro ao enviar sugestão:', err);
      alert('Erro ao enviar sugestão. Tente novamente mais tarde.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full m-4 max-h-full flex flex-col transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img src="./Wrench.png" alt="Manutenção" className="w-10 h-10" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Enviar Sugestão / Solicitação</h2>
              <p className="text-sm text-gray-600">Descreva o problema ou sugestão para zeladoria/adm.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#5e5ced]" placeholder="Ex.: Vazamento no corredor" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={6} className="mt-1 block w-full border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-[#5e5ced] resize-none" placeholder="Descreva o que aconteceu, local e se quiser fotos, responda via e-mail." />
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t border-gray-100">
          <button onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button onClick={handleSubmit} disabled={enviando} className="px-6 py-2 text-white bg-[#5e5ced] rounded-lg hover:bg-[#4a48c9] disabled:opacity-60">
            {enviando ? 'Enviando...' : 'Enviar Sugestão'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalManut;
