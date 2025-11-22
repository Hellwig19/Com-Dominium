import { useState, useEffect } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import ptBR from 'date-fns/locale/pt-BR';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Footer from '../Components/footer';
import Header from '../Components/Header';
import api from '../services/api';

interface AreaComumBackend {
  id: number;
  nome: string;
  capacidade: number;
  preco: number;
  statusConfig: 'ATIVO' | 'MANUTENCAO' | 'INATIVO' | 'OCUPADO';
  statusHoje: string;
}

const Reservas = () => {
  const [value, setValue] = useState(new Date());
  const [areas, setAreas] = useState<AreaComumBackend[]>([]);
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);

  const locales = { 'pt-BR': ptBR };
  const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
  const events: any[] = [];

  const [areaParaEditar, setAreaParaEditar] = useState<AreaComumBackend | null>(null);
  const [formArea, setFormArea] = useState({ nome: '', preco: '', capacidade: '', status: 'ATIVO' });
  const [blockedDates, setBlockedDates] = useState<string[]>([]);

  const today = new Date();
  const maxAllowed = new Date(today);
  maxAllowed.setMonth(maxAllowed.getMonth() + 6);

  const toISO = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  const fetchAreasPorData = async (dataSelecionada: Date) => {
    try {
      setIsLoadingAreas(true);
      const ano = dataSelecionada.getFullYear();
      const mes = String(dataSelecionada.getMonth() + 1).padStart(2, '0');
      const dia = String(dataSelecionada.getDate()).padStart(2, '0');
      const dataString = `${ano}-${mes}-${dia}`;

      const response = await api.get(`/areas/status-dia?data=${dataString}`);
      setAreas(response.data);
    } catch (error) {
      console.error('Erro ao buscar status das áreas:', error);
    } finally {
      setIsLoadingAreas(false);
    }
  };

  useEffect(() => {
    if (value) fetchAreasPorData(value);
  }, [value]);

  // try to load blocked dates from backend; if endpoint missing, ignore errors
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/areas/blocked-dates');
        if (Array.isArray(res.data)) setBlockedDates(res.data);
      } catch (err) {
        // ignore - we'll allow local toggles
      }
    };
    load();
  }, []);

  const abrirModalArea = (area: AreaComumBackend) => {
    setAreaParaEditar(area);
    setFormArea({ nome: area.nome, preco: String(area.preco), capacidade: String(area.capacidade), status: area.statusConfig });
  };

  const salvarArea = async () => {
    if (!areaParaEditar) return;

    const precoString = String(formArea.preco).replace(',', '.');
    const capacidadeString = String(formArea.capacidade).replace(',', '.');

    const precoNumber = parseFloat(precoString);
    const capacidadeNumber = parseFloat(capacidadeString);

    if (isNaN(precoNumber) || isNaN(capacidadeNumber)) {
      alert('Erro: O preço e a capacidade devem ser números válidos.');
      return;
    }

    try {
      await api.put(`/areas/${areaParaEditar.id}`, {
        nome: formArea.nome,
        preco: precoNumber,
        capacidade: capacidadeNumber,
        status: formArea.status,
      });
      alert('Área atualizada com sucesso!');
      setAreaParaEditar(null);
      fetchAreasPorData(value);
    } catch (error: any) {
      console.error(error);
      const msgErro = error.response?.data?.erro || error.response?.data?.message || 'Erro desconhecido ao atualizar.';
      alert(`Não foi possível atualizar: ${msgErro}`);
    }
  };

  const toggleBlockDate = async (date: Date, skipConfirm = false) => {
    const iso = toISO(date);
    const already = blockedDates.includes(iso);
    if (!skipConfirm) {
      const confirmMessage = already ? `Remover bloqueio da data ${iso}?` : `Bloquear a data ${iso} para locação?`;
      if (!window.confirm(confirmMessage)) return;
    }

    try {
      // try backend; if endpoints don't exist, fall back to local update
      if (already) {
        await api.patch('/areas/unblock-date', { date: iso });
        setBlockedDates((s) => s.filter(d => d !== iso));
        // no modal, small alert
      } else {
        await api.patch('/areas/block-date', { date: iso });
        setBlockedDates((s) => [...s, iso]);
      }
    } catch (error) {
      if (already) {
        setBlockedDates((s) => s.filter(d => d !== iso));
      } else {
        setBlockedDates((s) => [...s, iso]);
      }
    }
    fetchAreasPorData(date);
  };

  return (
    <>
      <header>
        <Header />
      </header>

      {/* Big Calendar styles (uses its own CSS import) */}

      {areaParaEditar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="bg-[#5e5ced] p-4 flex justify-between items-center">
              <h2 className="text-white font-bold text-lg">Editar Área Comum</h2>
              <button onClick={() => setAreaParaEditar(null)} className="text-white hover:bg-white/20 rounded-full p-1">
                <span className="text-xl font-bold">✕</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Área</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none" value={formArea.nome} onChange={e => setFormArea({ ...formArea, nome: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Taxa (R$)</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none" value={formArea.preco} onChange={e => setFormArea({ ...formArea, preco: e.target.value })} placeholder="0.00" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none" value={formArea.capacidade} onChange={e => setFormArea({ ...formArea, capacidade: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status de Disponibilidade</label>
                <select className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#5e5ced] outline-none" value={formArea.status} onChange={e => setFormArea({ ...formArea, status: e.target.value })}>
                  <option value="ATIVO">Ativo (Disponível para Reserva)</option>
                  <option value="MANUTENCAO">Em Manutenção (Bloqueado)</option>
                  <option value="OCUPADO">Ocupado / Bloqueado Manualmente</option>
                  <option value="INATIVO">Inativo (Oculto no app)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">* "Manutenção" e "Ocupado" impedem novas reservas no App.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setAreaParaEditar(null)} className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button onClick={salvarArea} className="flex-1 py-2 bg-[#5e5ced] text-white rounded-lg hover:bg-[#4a48c9] font-medium">Salvar Alterações</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="bg-[#EAEAEA] min-h-screen">
          <div className="flex justify-center items-center p-6 md:p-10">
          <div className="w-full max-w-[1800px] bg-white rounded-2xl shadow-2xl p-6 md:p-12 min-h-[760px]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">Gestão de Áreas Comuns</h1>
              <div className="text-sm text-gray-500">Visualizando: <span className="font-medium text-gray-700">{value.toLocaleDateString('pt-BR')}</span></div>
            </div>

            {/* Controls: removed manual day navigation buttons so days are selectable directly on the calendar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-red-500 inline-block" />
                  <span className="text-sm text-gray-600">Data bloqueada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-blue-200 inline-block border border-blue-300" />
                  <span className="text-sm text-gray-600">Data selecionada</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-gray-200 inline-block" />
                  <span className="text-sm text-gray-600">Fora do intervalo</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600">Filtrar status:</label>
                <select className="border rounded-lg p-2 text-sm" defaultValue="all">
                  <option value="all">Todos</option>
                  <option value="ATIVO">Ativo</option>
                  <option value="MANUTENCAO">Manutenção</option>
                  <option value="OCUPADO">Ocupado</option>
                  <option value="INATIVO">Inativo</option>
                </select>
              </div>
            </div>

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
              {/* Areas list (left column on large screens) - fixed width so calendar won't shrink */}
              <div className="w-full order-2 lg:order-1 max-h-[780px] overflow-y-auto pr-6" style={{ maxWidth: 480 }}>
                <div className="flex flex-col gap-4">
                  {isLoadingAreas && <p className="text-center py-4 text-blue-600">Buscando disponibilidade para esta data...</p>}

                  {!isLoadingAreas && areas.map((area) => {
                    const isManutencao = area.statusHoje === 'Manutenção';
                    const isOcupado = area.statusHoje === 'Ocupado (Fixo)' || area.statusHoje === 'Ocupado';

                    let borderColor = '#22c55e';
                    let statusColor = 'text-green-600';
                    let iconBg = 'bg-green-500';

                    if (isManutencao) {
                      borderColor = '#f97316';
                      statusColor = 'text-orange-600';
                      iconBg = 'bg-orange-500';
                    } else if (isOcupado) {
                      borderColor = '#ef4444';
                      statusColor = 'text-red-600';
                      iconBg = 'bg-red-500';
                    } else if (area.statusHoje === 'Inativo') {
                      borderColor = '#9ca3af';
                      statusColor = 'text-gray-500';
                      iconBg = 'bg-gray-400';
                    }

                    return (
                      <div key={area.id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-xl p-4 shadow-md border-l-4 transition-all hover:shadow-lg" style={{ borderLeftColor: borderColor }}>
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl ${iconBg}`}>
                            {isManutencao ? '🛠️' : '🏠'}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 text-lg">{area.nome}</h3>
                            <p className="text-sm text-gray-600">Capacidade: {area.capacidade} pessoas</p>
                            <p className={`text-sm font-bold ${statusColor}`}>{area.statusHoje}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Taxa de uso</p>
                            <span className="text-gray-800 font-bold text-lg">R$ {area.preco}</span>
                          </div>

                          <button onClick={() => abrirModalArea(area)} className="bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition text-sm font-medium shadow-sm">Editar / Manutenção</button>
                        </div>
                      </div>
                    );
                  })}

                  {areas.length === 0 && !isLoadingAreas && (
                    <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">Nenhuma área comum cadastrada no sistema.</div>
                  )}
                </div>
              </div>

              {/* Calendar: larger right column on large screens */}
              <div className="w-full lg:flex-1 flex-shrink-0 order-1 lg:order-2">
                <div className="bg-gray-50 rounded-xl shadow-md p-0 lg:p-2 flex justify-center items-start h-full w-full">
                    <div className="w-full px-0 lg:px-2">
                      <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="month"
                        views={["month"]}
                        onNavigate={(date: Date) => setValue(new Date(date))}
                        date={value}
                        selectable
                        onSelectSlot={(slotInfo: { start: Date; end: Date; slots?: Date[]; action?: string }) => {
                          const clicked = new Date(slotInfo.start);
                          const clickedDay = new Date(clicked.getFullYear(), clicked.getMonth(), clicked.getDate());
                          const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const maxStart = new Date(maxAllowed.getFullYear(), maxAllowed.getMonth(), maxAllowed.getDate());
                          if (clickedDay < todayStart || clickedDay > maxStart) {
                            alert('Selecione uma data entre hoje e +6 meses.');
                            return;
                          }
                          setValue(clickedDay);
                          fetchAreasPorData(clickedDay);
                        }}
                        dayPropGetter={(date: Date) => {
                          const iso = toISO(date);
                          // blocked dates should be prominent
                          if (blockedDates.includes(iso)) {
                            return { style: { background: '#ef4444', color: 'white', borderRadius: '6px' } };
                          }
                          // selected date
                          if (isSameDay(date, value)) {
                            return { style: { background: '#dbeafe', borderRadius: '8px', boxShadow: 'inset 0 0 0 2px #60a5fa' } };
                          }
                          // out of allowed range -> muted
                          const dayOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                          const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                          const maxStart = new Date(maxAllowed.getFullYear(), maxAllowed.getMonth(), maxAllowed.getDate());
                          if (dayOnly < todayStart || dayOnly > maxStart) {
                            return { style: { color: '#9ca3af', opacity: 0.45 } };
                          }
                          return {};
                        }}
                        style={{ height: 980, width: '100%' }}
                        messages={{ allDay: 'Dia inteiro', previous: '‹', next: '›', today: 'Hoje' }}
                      />
                    </div>
                </div>
                {/* footer controls for selected date (block/unblock) */}
                <div className="mt-4 w-full flex items-center justify-between gap-4">
                  <div className="text-sm text-gray-600">Selecionado: <span className="font-medium text-gray-800">{value.toLocaleDateString('pt-BR')}</span></div>
                  <div>
                    <button
                      onClick={() => toggleBlockDate(value, true)}
                      className={`px-4 py-2 rounded-lg font-medium ${blockedDates.includes(toISO(value)) ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                      {blockedDates.includes(toISO(value)) ? 'Remover bloqueio' : 'Bloquear data'}
                    </button>
                  </div>
                </div>
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
};

export default Reservas;
