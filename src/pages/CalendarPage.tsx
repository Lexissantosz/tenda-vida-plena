import { FormEvent, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, CircleAlert, Plus } from 'lucide-react'
import type { HouseEvent } from '../types/domain'

const filters = ['Todos', 'Gira', 'Desenvolvimento', 'Reunião', 'Organização', 'Datas religiosas']
const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

type CalendarPageProps = {
  events: HouseEvent[]
  canManage?: boolean
  onAddEvent?: (event: HouseEvent) => void
}

export function CalendarPage({ events, canManage = false, onAddEvent }: CalendarPageProps) {
  const [filter, setFilter] = useState('Todos')
  const [monthOffset, setMonthOffset] = useState(0)
  const [showCreate, setShowCreate] = useState(false)

  const visible = useMemo(() => filter === 'Todos' ? events : events.filter((event) => event.category === filter), [filter, events])

  const base = new Date(2026, 9 + monthOffset, 1)
  const year = base.getFullYear()
  const month = base.getMonth()
  const monthLabel = base.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)]

  const createEvent = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!onAddEvent) return
    const data = new FormData(event.currentTarget)
    onAddEvent({
      id: Date.now(),
      date: String(data.get('date')),
      title: String(data.get('title')),
      time: String(data.get('time')),
      category: String(data.get('category')),
      note: String(data.get('note') || 'Evento criado no protótipo.'),
      location: String(data.get('location') || '').trim() || undefined,
    })
    setShowCreate(false)
    event.currentTarget.reset()
  }

  return (
    <main className="page-content section-page">
      <section className="section-page-heading">
        <div>
          <p className="eyebrow">Agenda da casa</p>
          <h1>Calendário e próximos compromissos</h1>
          <p>Giras, desenvolvimento, reuniões, organização e eventos reunidos em um só calendário.</p>
        </div>
        {canManage && <button className="admin-action-button" onClick={() => setShowCreate((value) => !value)}><Plus size={17} /> Novo evento</button>}
      </section>

      {showCreate && canManage && (
        <section className="panel inline-admin-form">
          <form onSubmit={createEvent}>
            <input name="title" placeholder="Nome do evento" required />
            <input name="date" type="date" required />
            <input name="time" placeholder="Horário" required />
            <select name="category" defaultValue="Gira">{filters.filter((item) => item !== 'Todos').map((item) => <option key={item}>{item}</option>)}</select>
            <input name="location" placeholder="Local" />
            <input name="note" placeholder="Observação" />
            <button type="submit">Adicionar evento</button>
          </form>
        </section>
      )}

      <div className="chip-row">
        {filters.map((item) => <button key={item} className={item === filter ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}
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
            const dayEvents = day ? events.filter((event) => {
              const date = new Date(`${event.date}T12:00:00`)
              return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day
            }) : []
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
          {visible.map((event) => {
            const date = new Date(`${event.date}T12:00:00`)
            return (
              <article className="calendar-event" key={event.id}>
                <div className="calendar-date"><strong>{date.getDate()}</strong><span>{date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '').toUpperCase()}</span></div>
                <div className="calendar-event-copy">
                  <span className="content-tag">{event.category}</span>
                  <h3>{event.title}</h3>
                  <p>{event.time}{event.location ? ` • ${event.location}` : ''}</p>
                  <small>{event.note}</small>
                </div>
                <CalendarDays size={20} />
              </article>
            )
          })}
        </div>
        <aside className="calendar-note">
          <CircleAlert size={24} />
          <h3>Datas religiosas serão validadas</h3>
          <p>As datas específicas de Orixás e fundamentos entram somente depois da confirmação da própria Tenda.</p>
        </aside>
      </section>
    </main>
  )
}
