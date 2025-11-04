import { useState } from 'react';
import Footer from '../Components/footer';
import Header from "../Components/Header"

const mockEncomendas = [
  { casa: '45', morador: 'Maria Santos', proprietaria: true, transportadora: 'Correios', dataHora: '15/09/2025 14:30', tipo: 'Encomenda', status: 'Aguardando' },
  { casa: '45', morador: 'Maria Santos', proprietaria: true, transportadora: 'Correios', dataHora: '15/09/2025 14:30', tipo: 'Documento', status: 'Aguardando' },
  { casa: '45', morador: 'Maria Santos', proprietaria: true, transportadora: 'Shopee', dataHora: '15/09/2025 14:30', tipo: 'Encomenda', status: 'Aguardando' },
  { casa: '45', morador: 'Maria Santos', proprietaria: true, transportadora: 'Jadlog', dataHora: '15/09/2025 14:30', tipo: 'Encomenda', status: 'Aguardando' },
  { casa: '45', morador: 'Maria Santos', proprietaria: true, transportadora: 'Mercado Livre', dataHora: '15/09/2025 14:30', tipo: 'Encomenda', status: 'Aguardando' },
];

export default function Encomendas() {
  const [tamanhoEncomenda, setTamanhoEncomenda] = useState('Médio');

  return (
    <>
      <header>
        <Header />
      </header>

      <main className='bg-[#EAEAEA] min-h-screen'>
        {/*Botões de Navegação*/}
        <div className='flex justify-center items-center py-4 space-x-6'>
          <a href="/portaria">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
              <img className="mr-2 h-5 w-5" src="./Home.png" alt="" />
              Inicio
            </button>
          </a>
          <a href="/encomendas">
            <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
              <img className="mr-2 h-5 w-5" src="./Megaphone.png" alt="Ícone Encomendas" />
              Encomendas
            </button>
          </a>
          <button className='px-8 py-3 bg-white text-gray-700 rounded-xl shadow-md border border-gray-300 hover:bg-gray-100 hover:text-blue-600 transition duration-200 font-medium text-sm flex items-center'> {/* Aumentei px e py, e arredondamento */}
            <img className="mr-2 h-5 w-5" src="./PollAzul.png" alt="Ícone Visitantes" />
            Visitantes
          </button>
        </div>

        {/* Div Principal de Conteúdo */}
        <div className="flex justify-center items-start px-4 md:px-8 mt-6 pb-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[2300px]">
            <div className='flex-1 space-y-8'>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>Retirada de encomendas</h2>

                <div className='mb-6'>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Buscar por Número da casa</label>
                  <input type="text" placeholder="Digite o número da casa..." className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500' />
                </div>

                <div className='flex items-end space-x-4'>
                  <div className='flex-grow'>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Código de retirada</label>
                    <div className='relative'>
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <img className="h-5 w-5 text-gray-400" src="./Key.png" alt="Ícone Código" />
                      </span>
                      <input
                        type="text"
                        placeholder="Código fornecido pelo morador"
                        className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                      />
                    </div>
                  </div>
                  <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center'>
                    <img className="h-5 w-5 mr-1" src="./DoneCinza.png" alt="Ícone Validar" />
                    Validar
                  </button>
                </div>
                <p className='text-xs text-gray-500 mt-2 flex items-center'>
                  <img className="h-4 w-4 mr-1" src="./Info.png" alt="Ícone Informação" />
                  Um código permite retirar todas encomendas do morador
                </p>
              </div>

              {/* Encomendas na Portaria*/}
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-xl font-semibold text-gray-800 flex items-center'>
                    <img className="h-6 w-6 mr-2 text-blue-600" src="./Trolley.png" alt="Ícone Carrinho" />
                    Encomendas na Portaria
                  </h2>
                  <div className='flex space-x-3'>
                    <button className='px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 flex items-center'>
                      Todas as casas
                      <img className="h-4 w-4 ml-1" src="./Expand Arrow.png" alt="Ícone Seta" />
                    </button>
                    <button className='px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 flex items-center'>
                      Ordenar por data
                      <img className="h-4 w-4 ml-1" src="./Expand Arrow.png" alt="Ícone Seta" />
                    </button>
                  </div>
                </div>

                {/* Tabela */}
                <div className='overflow-x-auto'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Casa</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Morador</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Transportadora</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Data/Hora</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tipo</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Ações</th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {mockEncomendas.map((encomenda, index) => (
                        <tr key={index}>
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <span className='bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>{encomenda.casa}</span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {encomenda.morador}
                            {encomenda.proprietaria && <span className='text-xs text-blue-600 block'>Proprietária</span>}
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                            <div className='flex items-center space-x-1'>
                              <span className='text-sm font-semibold text-blue-800'>{encomenda.transportadora}</span>
                            </div>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {encomenda.dataHora}
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${encomenda.tipo === 'Encomenda' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                              {encomenda.tipo}
                            </span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap'>
                            <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-orange-600'>
                              {encomenda.status}
                            </span>
                          </td>
                          <td className='px-4 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            <button className='text-gray-500 hover:text-gray-700'>
                              <img className="h-5 w-5" src="./Menu Vertical.png" alt="Ícone Ações" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/*Adicionar Encomenda*/}
            <div className='w-full lg:w-96 bg-white p-6 rounded-lg shadow-xl h-fit flex-shrink-0'>
              <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center'>
                <img className="h-6 w-6 mr-2 text-blue-600" src="./Add.png" alt="Ícone Adicionar" />
                Adicionar Encomenda
              </h2>

              <div className='space-y-6'>
                <div>
                  <label htmlFor="numCasa" className='block text-sm font-medium text-gray-700'>Número da Casa <span className='text-red-500'>*</span></label>
                  <input type="text" id="numCasa" placeholder="Ex: 45" className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label htmlFor="morador" className='block text-sm font-medium text-gray-700'>Nome do Morador <span className='text-red-500'>*</span></label>
                  <input type="text" id="morador" placeholder="Nome completo do morador" className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                  />
                </div>

                <div>
                  <label htmlFor="transportadora" className='block text-sm font-medium text-gray-700'>Transportadora</label>
                  <select id="transportadora" className='w-full p-2 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500'>
                    <option value="">Selecione a transportadora</option>
                    <option value="correios">Correios</option>
                    <option value="shopee">Shopee</option>
                    <option value="jadlog">Jadlog</option>
                    <option value="mercadolivre">Mercado Livre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tipoEncomenda" className='block text-sm font-medium text-gray-700'>Tipo de encomenda</label>
                  <select id="tipoEncomenda" className='w-full p-2 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500'>
                    <option value="">Selecione o tipo</option>
                    <option value="encomenda">Encomenda</option>
                    <option value="documento">Documento</option>
                    <option value="chave">Chave/Objeto Pessoal</option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>Tamanho da encomenda</label>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <input id="tamanho-pequeno" name="tamanhoEncomenda" type="radio" checked={tamanhoEncomenda === 'Pequeno'} onChange={() => setTamanhoEncomenda('Pequeno')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                      <label htmlFor="tamanho-pequeno" className="ml-2 block text-sm font-medium text-gray-700">
                        Pequeno
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="tamanho-medio" name="tamanhoEncomenda" type="radio" checked={tamanhoEncomenda === 'Médio'} onChange={() => setTamanhoEncomenda('Médio')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                      <label htmlFor="tamanho-medio" className="ml-2 block text-sm font-medium text-gray-700">
                        Médio
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input id="tamanho-grande" name="tamanhoEncomenda" type="radio" checked={tamanhoEncomenda === 'Grande'} onChange={() => setTamanhoEncomenda('Grande')} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"/>
                      <label htmlFor="tamanho-grande" className="ml-2 block text-sm font-medium text-gray-700">
                        Grande
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="observacoes" className='block text-sm font-medium text-gray-700'>Observações</label>
                  <textarea id="observacoes" placeholder="Observações adicionais (opcional)" className='w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none'
                  ></textarea>
                </div>

                <button
                  className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold text-lg flex items-center justify-center shadow-lg'
                >
                  <img className="h-6 w-6 mr-2" src="./Secure.png" alt="Ícone Registrar" />
                  Registrar Encomenda
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}