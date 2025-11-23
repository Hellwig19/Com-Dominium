import Footer from '../Components/footer';
import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);

    try {
      const response = await api.post('/admin-login', {
        cpf: cpf,
        senha: password,
      });

      if (response.status === 200) {
        const { token, nivel, nome } = response.data;
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_nivel');
        localStorage.removeItem('admin_nome');
        sessionStorage.setItem('admin_token', token);
        sessionStorage.setItem('admin_nivel', nivel.toString());
        sessionStorage.setItem('admin_nome', nome || 'Colaborador');

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        switch (nivel) {
          case 5:
          case 2:
            navigate('/admin');
            break;
          case 3:
            navigate('/portaria');
            break;
          default:
            navigate('/');
            break;
        }
      }
    } catch (err: any) {
      console.error("Erro no login:", err);
      const errorMessage = err.response?.data?.erro || 'Erro ao conectar ao servidor.';
      setLoginError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full h-[110px] bg-gradient-to-r from-[#5e5ced] to-[#572486] flex items-center justify-between px-10">
        <a href="#" className="flex items-center flex-shrink-0">
          <img src="../Logo.png" alt="Logo" className="h-[70px]" />
        </a>
        <div className="flex flex-col items-center text-white font-bold text-center flex-1">
          <h1 className="text-4xl leading-none">Portal do colaborador</h1>
          <h2 className="text-base font-medium leading-tight">
            Sistema Integrado de Gestão Condominial
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-white flex-shrink-0">
          <a href="https://wa.me/53991384332" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:opacity-60 transition">
            <img src="../Headset.png" alt="Suporte" className="h-[30px] w-[30px]" />
            <span className="text-base font-medium">Suporte</span>
          </a>
        </div>
      </header>

      <main className="bg-[#EAEAEA] flex-grow">
        <div className="flex items-start justify-center gap-20 py-16">
          <div className="w-[440px] h-[496px] bg-white rounded-[10px] shadow-xl p-6 flex-shrink-0">
            <h1 className="text-2xl font-medium px-4 py-2 pt-4">Acesso Exclusivo para:</h1>
            <div className="flex flex-col items-center justify-center pt-4 space-y-4">
              <div className="bg-[#B7FDCC4D] w-[360px] rounded-[10px] flex py-6 px-4 shadow-md">
                <img src="../Building.png" alt="" className="w-12 h-12 flex-shrink-0" />
                <div className="flex flex-col px-4">
                  <h1 className="text-green-600 text-2xl font-semibold">Porteiros</h1>
                  <h1 className="text-green-600 text-sm">Controle de acesso e segurança</h1>
                </div>
              </div>

              <div className="bg-[#F3E8FF] w-[360px] rounded-[10px] flex py-6 px-4 shadow-md">
                <img src="../Broom.png" alt="" className="w-12 h-12 flex-shrink-0" />
                <div className="flex flex-col px-4">
                  <h1 className="text-purple-600 text-2xl font-semibold">Zeladoria</h1>
                  <h1 className="text-purple-600 text-sm">Manutenção e limpeza</h1>
                </div>
              </div>
              <div className="bg-[#6B98F94D] w-[360px] rounded-[10px] flex py-6 px-4 shadow-md">
                <img src="../User.png" alt="" className="w-12 h-12 flex-shrink-0" />
                <div className="flex flex-col px-4">
                  <h1 className="text-blue-600 text-2xl font-semibold">Síndico</h1>
                  <h1 className="text-blue-600 text-sm">Administração e gestão geral</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[440px] h-[496px] bg-white rounded-[10px] shadow-xl flex-shrink-0 overflow-auto">
            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] w-full h-[170px] rounded-t-[10px] flex items-center justify-center flex-col p-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-900 rounded-full flex items-center justify-center shadow-md">
                <img src="../LOGIN.png" alt="" className="w-10 h-10" />
              </div>
              <h1 className="text-white text-2xl font-medium text-center mt-2">Login Colaborador</h1>
              <h1 className="text-white text-base text-center opacity-90">Acesse sua área de trabalho</h1>
            </div>

            <form className="max-w-sm mx-auto py-6 px-8" onSubmit={handleLogin}>

              {loginError && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded text-center">
                  {loginError}
                </div>
              )}

              <div className="mb-5 relative">
                <label htmlFor="cpf" className="text-sm font-medium text-gray-900 block mb-2">CPF</label>
                <div className="absolute inset-y-12 left-0 flex items-center pl-3 pointer-events-none">
                  <img src="../UserCPF.png" alt="Ícone de CPF" className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="cpf" 
                  value={cpf} 
                  onChange={(e) => setCpf(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10" 
                  placeholder="000.000.000-00" 
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2">Senha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <img src="../Lock.png" alt="Cadeado" className="w-5 h-5 text-gray-400" />
                  </div>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 pr-10" 
                    placeholder="********" 
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.94 10.94 0 0112 19c-5.52 0-9.31-2.94-10.59-7a10.94 10.94 0 012.02-3.5" />
                        <path d="M1 1l22 22" />
                        <path d="M9.88 9.88A3 3 0 0014.12 14.12" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              {/* Link 'Esqueci minha senha' removido conforme solicitado */}
              <div className="flex items-center justify-center">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-white w-full flex items-center justify-center py-12 px-10">
          <div className="w-[1100px] h-auto bg-[#FEF9C3] rounded-[5px] border border-[#B57F44] flex items-center justify-start px-16 py-8 shadow-sm">
            <div className="w-18 h-18 bg-[#F1CB51] rounded-[10px] flex items-center justify-center flex-shrink-0 mr-6">
              <img src="../Security.png" alt="" className="w-14 h-14" />
            </div>
            <div>
              <h1 className='text-xl font-bold'>Aviso de Segurança</h1>
              <h1 className='text-[#B57F44] text-base font-bold leading-relaxed'>
                Este sistema é de uso exclusivo dos colaboradores autorizados. Todas as atividades são monitoradas e registradas para garantir a segurança do condomínio.
              </h1>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Login;