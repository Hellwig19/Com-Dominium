import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCad: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose} >
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4" onClick={(e) => e.stopPropagation()} >
                {/* Conteudo da Modal*/}

            </div>
        </div>
    );
};

export default ModalCad;