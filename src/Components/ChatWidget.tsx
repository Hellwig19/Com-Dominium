import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, ChevronLeft } from 'lucide-react'; 
import api from '../services/api';

interface ChatItem {
    clienteId: string;
    nome: string;
    casa: string;
    ultimaMensagem: string;
    horario: string;
    naoLidas: number;
}

interface Mensagem {
    id: number;
    texto: string;
    enviadoPorPortaria: boolean;
    createdAt: string;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeChat, setActiveChat] = useState<ChatItem | null>(null); 
    
    const [inboxList, setInboxList] = useState<ChatItem[]>([]);
    const [messages, setMessages] = useState<Mensagem[]>([]);
    const [inputText, setInputText] = useState('');
    const [lastMsgCount, setLastMsgCount] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof Audio !== "undefined") {
            audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
        }
    }, []);


    useEffect(() => {
        fetchInbox();

        const interval = setInterval(() => {
            fetchInbox();
        }, 5000); 

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let interval: any;
        if (isOpen && activeChat) {
            fetchMessages(activeChat.clienteId);
            interval = setInterval(() => fetchMessages(activeChat.clienteId), 3000);
        }
        return () => clearInterval(interval);
    }, [isOpen, activeChat]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchInbox = async () => {
        try {
            const res = await api.get('/chat/inbox');
            const lista = res.data;
            
            const totalNaoLidas = lista.reduce((acc: number, item: any) => acc + item.naoLidas, 0);

            setLastMsgCount(prevCount => {
                if (totalNaoLidas > prevCount && audioRef.current) {
                    audioRef.current.play().catch(e => console.log("Autoplay bloqueado:", e));
                }
                return totalNaoLidas;
            });
            
            setInboxList(lista);
        } catch (error) {
            console.error("Erro inbox", error);
        }
    };

    const fetchMessages = async (clienteId: string) => {
        try {
            const res = await api.get(`/chat/${clienteId}`);
            setMessages(res.data);
            
            if (isOpen && activeChat?.clienteId === clienteId) {
            }
        } catch (error) {
            console.error("Erro msgs", error);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !activeChat) return;

        const text = inputText;
        setInputText('');
        
        try {
            await api.post('/chat', {
                texto: text,
                clienteId: activeChat.clienteId
            });
            fetchMessages(activeChat.clienteId);
        } catch (error) {
            alert("Erro ao enviar");
            setInputText(text);
        }
    };

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
    };

    if (!isOpen) {
        const totalNaoLidas = inboxList.reduce((acc, item) => acc + item.naoLidas, 0);
        
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-[#5E5CED] hover:bg-[#4a48c9] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50"
            >
                <MessageCircle size={28} />
                
                {totalNaoLidas > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                        {totalNaoLidas}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 z-50 overflow-hidden animate-fade-in">
            <div className="bg-[#5E5CED] p-4 flex justify-between items-center text-white shrink-0">
                {activeChat ? (
                    <div className="flex items-center gap-2">
                        <button onClick={() => setActiveChat(null)} className="hover:bg-white/20 p-1 rounded-full">
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h3 className="font-bold text-sm">{activeChat.nome}</h3>
                            <span className="text-xs opacity-80">Casa {activeChat.casa}</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="font-bold text-lg">Mensagens</h3>
                        <span className="text-xs opacity-80">Comunicação com moradores</span>
                    </div>
                )}
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50" ref={scrollRef}>
                {activeChat ? (
                    <div className="p-4 space-y-3">
                        {messages.length === 0 && (
                            <p className="text-center text-gray-400 text-sm mt-10">Nenhuma mensagem nas últimas 24h.</p>
                        )}
                        {messages.map((msg) => {
                            const isMe = msg.enviadoPorPortaria; 
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-xl text-sm shadow-sm ${
                                        isMe 
                                        ? 'bg-[#5E5CED] text-white rounded-br-none' 
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                    }`}>
                                        <p>{msg.texto}</p>
                                        <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                            {formatTime(msg.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {inboxList.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-64 text-gray-400 p-6 text-center">
                                <MessageCircle size={40} className="mb-2 opacity-20" />
                                <p>Nenhuma conversa recente.</p>
                            </div>
                        ) : (
                            inboxList.map((chat) => (
                                <button 
                                    key={chat.clienteId} 
                                    onClick={() => setActiveChat(chat)}
                                    className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition text-left ${chat.naoLidas > 0 ? 'bg-blue-50' : 'bg-white'}`}
                                >
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold shrink-0 relative">
                                        {chat.nome.charAt(0)}
                                        {chat.naoLidas > 0 && (
                                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                                {chat.naoLidas}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className={`text-sm truncate ${chat.naoLidas > 0 ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                                                {chat.nome}
                                            </h4>
                                            <span className="text-xs text-gray-400">{formatTime(chat.horario)}</span>
                                        </div>
                                        <p className={`text-sm truncate ${chat.naoLidas > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                                            {chat.ultimaMensagem}
                                        </p>
                                        <span className="text-xs text-gray-400">Casa {chat.casa}</span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                )}
            </div>

            {activeChat && (
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                    <input 
                        type="text" 
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#5E5CED] focus:ring-1 focus:ring-[#5E5CED]"
                        placeholder="Digite sua mensagem..."
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                    />
                    <button 
                        type="submit" 
                        disabled={!inputText.trim()}
                        className="w-10 h-10 bg-[#5E5CED] text-white rounded-full flex items-center justify-center hover:bg-[#4a48c9] disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        <Send size={18} />
                    </button>
                </form>
            )}
        </div>
    );
};

export default ChatWidget;