import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, CircleAlert } from 'lucide-react'

const filters = ['Todos', 'Gira', 'Desenvolvimento', 'Organização', 'Datas religiosas']
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const events = [
  { id: 1, day: 10, title: 'Gira de Caboclo', time: '19h', category: 'Gira', note: 'Exemplo para validação do layout.' },
  { id: 2, day: 17, title: 'Desenvolvimento', time: '19h30', category: 'Desenvolvimento', note: 'Exemplo para validação do layout.' },
  { id: 3, day: 24, title: 'Organização e limpeza da casa', time: '15h', category: 'Organização', note: 'Exemplo para validação do layout.' },
]

export function CalendarPage() {
  const [filter, setFilter] = useState('Todos')
  const [monthOffset, setMonthOffset] = useState(0)

  const visible = useMemo(
    () => filter === 'Todos' ? events : events.filter((event) => event.category === filter),
    [filter],
  )

  const base = new Date(2026, 9 + monthOffset, 1)
  const year = base.getFullYear()
  const month = base.getMonth()
  const monthLabel = base.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Agenda da casa</p>
          <h1>Calendário e próximos compromissos</h1>
          <p>Visual mensal para localização rápida e lista cronológica para enxergar os detalhes sem apertar os olhos para quadradinhos minúsculos.</p>
        </div>
      </section>

      <div className="chip-row">
        {filters.map((item) => (
          <button key={item} className={item === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="month-calendar panel">
        <div className="calendar-toolbar">
          <button onClick={() => setMonthOffset((value) => value - 1)}><ChevronLeft size={18} /></button>
          <strong>{monthLabel}</strong>
          <button onClick={() => setMonthOffset((value) => value + 1)}><ChevronRight size={18} /></button>
        </div>

        <div className="month-grid">
          {weekDays.map((day) => <span className="weekday" key={day}>{day}</span>)}
          {cells.map((day, index) => {
            const dayEvents = monthOffset === 0 && day ? events.filter((event) => event.day === day) : []
            return (
              <div className={dayEvents.length ? 'month-day has-event' : 'month-day'} key={`${day}-${index}`}>
                {day && <strong>{day}</strong>}
                {dayEvents.map((event) => <span key={event.id}>{event.title}</span>)}
              </div>
            )
          })}
        </div>
      </section>

      <section className="calendar-layout">
        <div className="calendar-list">
          {visible.map((event) => (
            <article className="calendar-event" key={event.id}>
              <div className="calendar-date"><strong>{event.day}</strong><span>OUT</span></div>
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
          <p>Vamos preencher essa parte somente depois de validar com a Tenda quais datas e referências devem ser adotadas.</p>
        </aside>
      </section>
    </main>
  )
}
