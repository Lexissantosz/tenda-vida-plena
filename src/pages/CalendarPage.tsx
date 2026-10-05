import { useMemo, useState } from 'react'
import { CalendarDays, CircleAlert } from 'lucide-react'

const filters = ['Todos', 'Gira', 'Desenvolvimento', 'Organização', 'Datas religiosas']

const events = [
  { id: 1, date: '10', month: 'OUT', title: 'Gira de Caboclo', time: '19h', category: 'Gira', note: 'Exemplo para validação do layout.' },
  { id: 2, date: '17', month: 'OUT', title: 'Desenvolvimento', time: '19h30', category: 'Desenvolvimento', note: 'Exemplo para validação do layout.' },
  { id: 3, date: '24', month: 'OUT', title: 'Organização e limpeza da casa', time: '15h', category: 'Organização', note: 'Exemplo para validação do layout.' },
  { id: 4, date: '—', month: '—', title: 'Datas dos Orixás', time: 'A confirmar', category: 'Datas religiosas', note: 'As datas serão preenchidas depois da validação com o Pai/Mãe de Santo.' },
]

export function CalendarPage() {
  const [filter, setFilter] = useState('Todos')
  const visible = useMemo(() => filter === 'Todos' ? events : events.filter((event) => event.category === filter), [filter])

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Agenda da casa</p>
          <h1>Calendário em um só lugar</h1>
          <p>Giras, desenvolvimento, organização, eventos e datas religiosas podem conviver na mesma agenda, cada um com sua categoria.</p>
        </div>
      </section>

      <div className="chip-row">
        {filters.map((item) => (
          <button key={item} className={item === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="calendar-layout">
        <div className="calendar-list">
          {visible.map((event) => (
            <article className="calendar-event" key={event.id}>
              <div className="calendar-date">
                <strong>{event.date}</strong>
                <span>{event.month}</span>
              </div>
              <div className="calendar-event-copy">
                <span className="content-tag">{event.category}</span>
                <h3>{event.title}</h3>
                <p>{event.time}</p>
                <small>{event.note}</small>
              </div>
              <CalendarDays size={20} />
            </article>
          ))}
        </div>

        <aside className="calendar-note">
          <CircleAlert size={24} />
          <h3>Datas religiosas ainda não estão fechadas</h3>
          <p>Vamos alimentar essa parte somente depois de validar com a Tenda quais datas e referências devem ser adotadas.</p>
        </aside>
      </section>
    </main>
  )
}
