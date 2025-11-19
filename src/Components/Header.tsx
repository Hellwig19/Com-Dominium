import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [nome, setNome] = useState('Colaborador');
  const [cargo, setCargo] = useState('Visitante');
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Recupera os dados salvos no Login (Session tem prioridade)
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    const nivelSalvo = sessionStorage.getItem('admin_nivel') || localStorage.getItem('admin_nivel');

    // 2. Formata o Nome (Pega apenas o primeiro nome)
    if (nomeSalvo) {
      setNome(nomeSalvo.split(' ')[0]);
    }

    // 3. Define o Cargo baseado no Nível
    const nivel = Number(nivelSalvo);
    
    switch (nivel) {
      case 5:
        setCargo('Zeladora');
        break;
      case 3:
        setCargo('Porteiro');
        break;
      case 2:
        setCargo('Sindico');
        break;
      default:
        setCargo('Colaborador');
    }
  }, []);

  // Função para deslogar corretamente
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Limpa todos os dados de autenticação
    sessionStorage.clear();
    localStorage.clear();
    // Redireciona para a tela de login
    navigate('/');
  };

  return (
    <>
      <header className="w-full h-[110px] bg-gradient-to-r from-[#5e5ced] to-[#572486] flex items-center justify-between px-10">
        <div className="flex items-center flex-shrink-0">
          <a href="/admin">
            <img src="../Logo.png" alt="Logo" className="" />
          </a>
          {/* Atualiza o título também com o cargo dinâmico */}
          <h1 className="text-white px-4 pt-7">Residencial Jardins • {cargo}</h1>
        </div>

        <div className="gap-2 flex items-center justify-center">
          <img src="../Doorbell.png" alt="Notificações" />
          
          <div className="bg-[#EAEAEA] rounded-full h-12 w-[0.1px] mx-2"></div>
          
          {/* Placeholder para foto de perfil (pode ser lógica futura) */}
          <div className="bg-[#EAEAEA] rounded-full h-12 w-12 flex items-center justify-center text-[#572486] font-bold text-xl">
             {nome.charAt(0)}
          </div>

          <div className="text-white ml-2">
            <h1 className="text-[18px] font-semibold leading-tight">{nome}</h1>
            <h1 className="text-[14px] opacity-90">{cargo}</h1>
          </div>

          <a href="/" onClick={handleLogout} title="Sair">
            <img className="flex items-end justify-end w-9 h-9 ml-4 hover:opacity-80 transition" src="../Logout.png" alt="Sair" />
          </a>
        </div>
      </header>
    </>
  );
}