import Footer from '../Components/footer';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [cpf, setCpf] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/admin-login', {
        cpf: cpf,
        senha: password, 
      });

      if (response.status === 200) {
        const { token, nivel } = response.data;

        localStorage.setItem('admin_token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        switch (nivel) {
          case 5:
            navigate('/zeladoria');
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
      setError(err.response?.data?.erro || 'Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <>
      <header className="w-full h-[110px] bg-gradient-to-r from-[#5e5ced] to-[#572486] flex items-center justify-between px-10">
        <a href="#" className="flex items-center flex-shrink-0">
          <img src="../Logo.png" alt="Logo" className="" />
        </a>
        <div className="flex flex-col items-center text-white font-bold text-center flex-1">
          <h1 className="text-4xl leading-none">Portal do colaborador</h1>
          <h2 className="text-base font-medium leading-tight">
            Sistema Integrado de Gestão Condominial
          </h2>
        </div>
        <div className="flex items-center space-x-2 text-white">
          <a href="#" className="flex items-center space-x-2 hover:opacity-60 transition">
            <img src="../Headset.png" alt="Suporte" className="" />
            <span className="text-base font-medium">Suporte</span>
          </a>
        </div>
      </header>

      <main className="bg-[#EAEAEA] flex-grow">
        <div className="flex items-center justify-center gap-20 py-16">     
          <div className="w-110 h-[496px] bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <h1 className="w-96 h-10 justify-start text-black text-2xl font-medium px-16 py-2 pt-8">Acesso Exclusivo para:</h1>

            <div className="items-center justify-center px-12 py-12 flex-col">
              <div className="bg-[#B7FDCC4D] w-84 rounded-[10px] flex py-6 px-4">
                  <img src="../Building.png" alt="" className="w-12 h-12" />
                  <div className="flex flex-col px-4">
                    <h1 className="text-green-600 text-2xl font-semibold">Porteiros</h1>
                    <h1 className="text-green-600 text-sm">Controle de acesso e segurança</h1>
                  </div>
              </div>      
              <div className="py-8">   
              <div className="bg-[#F3E8FF] w-84 rounded-[10px] flex py-6 px-4">
                  <img src="../Broom.png" alt="" className="w-12 h-12" />
                  <div className="flex flex-col px-4">
                    <h1 className="text-purple-600 text-2xl font-semibold">Zeladoria</h1>
                    <h1 className="text-purple-600 text-sm">Manutenção e limpeza</h1>
                  </div>
              </div>
              </div>  
              <div className="bg-[#6B98F94D] w-84 rounded-[10px] flex py-6 px-4">
                  <img src="../User.png" alt="" className="w-12 h-12" />
                  <div className="flex flex-col px-4">
                    <h1 className="text-blue-600 text-2xl font-semibold">Síndico</h1>
                    <h1 className="text-blue-600  text-sm">Administração e gestão geral</h1>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="w-110 h-[496px] bg-white rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
            <div className="bg-gradient-to-r from-[#5e5ced] to-[#572486] w-auto h-42 rounded-[5px] flex py-6 px-4 items-center justify-center flex-col">
              <div className="w-15 h-15 bg-gradient-to-r from-indigo-500 to-purple-900 rounded-[30px]">
                <img src="../LOGIN.png" alt="" className="px-1 py-1" />
              </div>
                <h1 className="w-52 h-10 text-white text-2xl font-medium text-center py-2">Login Colaborador</h1>
                <h1 className="w-52 h-10 text-white text-center">Acesse sua área de trabalho</h1>
            </div>

            <form className="max-w-sm mx-auto py-6" onSubmit={handleLogin}>
              {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
              
              <div className="mb-5 relative">
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">CPF</label>
                <div className="absolute inset-y-12 left-0 flex items-center pl-3 pointer-events-none">
                    <img src="UserCPF.png" alt="Ícone de CPF" className="text-gray-400 dark:text-gray-400" />
                </div>
                <input 
                  type="text" 
                  id="cpf" 
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="000.000.000-00" 
                  required 
                />
              </div>
              <div className="mb-5">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-500">Sua Senha</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img src="../Lock.png" alt="Cadeado" className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                    </div>
                    
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      id="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 pr-10 dark:bg-white dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="********" 
                      required
                    />

                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                      {showPassword ? (
                          <img src="../EyeSlash.png" alt="Esconder Senha" className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                      ) : (
                          <img src="../Eye.png" alt="Mostrar Senha" className="w-5 h-5 text-gray-400 dark:text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center px-4">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-400">Lembrar-me</label>
                    </div>
                    <a href="#" className='text-sm mx-4 font-medium text-[#2B67EC]'>Esqueci minha senha</a>
                </div>
              <div className="flex items-center justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-40 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Entrar</button>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white w-auto flex items-center justify-center py-12">
          <div className=" w-[1300px] h-38 bg-[#FEF9C3] rounded-[5px] border border-[#B57F44] flex items-center justify-start px-16">
            <div className="w-18 h-18 bg-[#F1CB51] rounded-[10px] flex items-center justify-center">
                <img src="../Security.png" alt="" className="w-14 h-14" />
            </div>
            <div className='px-8'>
                <h1 className='w-64 text-xl font-bold'>Aviso de Segurança</h1>
                <h1 className='w-256 text-[#F1CB51] font-bold'>Este sistema é de uso exclusivo dos colaboradores autorizados. Todas as atividades são monitoradas e registradas para garantir a segurança do condomínio.</h1>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer/>
      </footer>
    </>
  );
};

export default App;