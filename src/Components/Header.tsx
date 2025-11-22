import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [nome, setNome] = useState('Colaborador');
  const [cargo, setCargo] = useState('Visitante');
  const navigate = useNavigate();

  useEffect(() => {
    const nomeSalvo = sessionStorage.getItem('admin_nome') || localStorage.getItem('admin_nome');
    const nivelSalvo = sessionStorage.getItem('admin_nivel') || localStorage.getItem('admin_nivel');

    if (nomeSalvo) {
      setNome(nomeSalvo.split(' ')[0]);
    }

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

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
  };

  const getHomePath = () => {
    const nivelSalvo = Number(sessionStorage.getItem('admin_nivel') || localStorage.getItem('admin_nivel') || 0);
    if (nivelSalvo === 3) return '/portaria';
    if (nivelSalvo === 2 || nivelSalvo === 5) return '/admin';
    return '/';
  };

  return (
    <>
      <header className="w-full h-[110px] bg-gradient-to-r from-[#5e5ced] to-[#572486] flex items-center justify-between px-10">
        <div className="flex items-center flex-shrink-0">
          <a href={getHomePath()} onClick={(e) => { e.preventDefault(); navigate(getHomePath()); }}>
            <img src="../Logo.png" alt="Logo" className="h-24 w-auto mr-4" />
          </a>
          <h1 className="text-white text-2xl font-normal leading-none flex items-center">
            Moradas Club 1
            <span className="text-2xl font-normal opacity-90 ml-3">• {cargo}</span>
          </h1>
        </div>

        <div className="gap-2 flex items-center justify-center">
          <div className="bg-[#EAEAEA] rounded-full h-12 w-[0.1px] mx-2"></div>
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